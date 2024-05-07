import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, HostBinding, HostListener, Injector, Input, OnDestroy, Output, TemplateRef, ViewChild, forwardRef, inject, runInInjectionContext } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { ReplaySubject, startWith, tap } from 'rxjs';
import { HoverableDirective, InputFieldDirective, PheadOverlayRef, PheadOverlayService } from '../../../base';
import { SEARCH_SUGGESTION } from './search-input';
import { SearchInputLabelDirective } from './search-input-label.directive';
import { SearchInputSuggestionItemDirective } from './search-input-suggestion-item.directive';

@Component({
  selector: 'phead-search-input',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    ScrollingModule,
    HoverableDirective,
    InputFieldDirective,
  ],
  host: {
    class: 'phead-search-input',
    tabIndex: '0',
  },
  templateUrl: './search-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent<T> extends EffectFn implements ControlValueAccessor, OnDestroy {
  onChange?: (v: T) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  formControl = inject(FormBuilder).nonNullable.control(null as T);
  searchControl = inject(FormBuilder).nonNullable.control(null as string | null | undefined);

  @Input({ required: true }) sourceName!: string;
  @Input({ required: true }) pickWith!: (item: any) => T;
  @Input() set value(v: T) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<T>();
  @HostBinding('attr.data-popupvisible') hostPopupvisible = false;
  @ContentChild(SearchInputLabelDirective) label?: SearchInputLabelDirective;
  @ContentChild(SearchInputSuggestionItemDirective) item?: SearchInputSuggestionItemDirective;
  @ViewChild('searchPopup') private searchPopup!: TemplateRef<unknown>;

  private overlay = inject(PheadOverlayService, { optional: true });
  overlayRef?: PheadOverlayRef;
  private _searchStr$ = new ReplaySubject<string | null | undefined>(1);
  suggestionSources = inject(SEARCH_SUGGESTION);
  private injector = inject(Injector);
  private cdr = inject(ChangeDetectorRef);

  @HostListener('click', ['$event'])
  private hostClick = this.createEffectFn<MouseEvent>(args$ => args$.pipe(
    tap((event) => {
      if (this.isDisabled) return;
      if (this.overlayRef) return;
      if (!this.overlay) return;
      if (this.suggestionSources.every(s => s.name !== this.sourceName)) return;
      if (this.item?.templateRef == null) return;
      if (!(event.currentTarget instanceof HTMLElement)) return;
      runInInjectionContext(this.injector, () => {
        this.hostPopupvisible = true;
        this.overlayRef = this.overlay!.open(this.searchPopup, {
          positionStrategy: this.overlay!.position().flexibleConnectedTo(event.currentTarget as HTMLElement)
            .withPositions([
              { overlayX: 'end', overlayY: 'top', originX: 'end', originY: 'bottom', offsetY: 4 },
            ]),
          scrollStrategy: this.overlay!.scrollStrategies.reposition(),
          width: (event.currentTarget as HTMLElement).getBoundingClientRect().width,
          data: {
            source$: this._searchStr$.pipe(
              startWith(null as string | null | undefined),
              this.suggestionSources.find(s => s.name === this.sourceName)?.source!
            ),
          }
        })
        this.overlayRef.afterClosed$.subscribe(() => {
          this.overlayRef = undefined;
          this.hostPopupvisible = false;
        });
      })
    })
  ))

  writeValue(obj: T): void {
    this.formControl.reset(obj);
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
    this.isDisabled = isDisabled;
  }

  trackingFn(index: number, item: unknown) {
    if (item != null && typeof item === 'object' && 'id' in item) return item.id;
    return item;
  }

  searchInput = this.createEffectFn<void>(args$ => args$.pipe(
    tap(() => this._searchStr$.next(this.searchControl.getRawValue()?.length! > 0 ? this.searchControl.getRawValue() : null))
  ))

  selectValue(value: T) {
    if (this.isDisabled) return;
    this.formControl.setValue(this.pickWith(value));
    this.formControl.markAsDirty();
    this.handleInput();
    this.overlayRef?.close();
    this.cdr.markForCheck();
  }

  handleInput() {
    if (this.isDisabled) return;
    this.onChange?.(this.formControl.getRawValue());
    this.valueChange.emit(this.formControl.getRawValue());
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._searchStr$.complete();
  }
}
