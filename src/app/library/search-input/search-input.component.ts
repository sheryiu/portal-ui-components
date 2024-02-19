import { Component, EventEmitter, HostBinding, HostListener, Injector, Input, Output, TemplateRef, ViewChild, forwardRef, inject, runInInjectionContext } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { nanoid } from 'nanoid';
import { ReplaySubject, pipe, switchMap, tap } from 'rxjs';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { OverlayService } from '../../components/overlay/overlay.service';
import { SharedModule } from '../../shared/shared.module';
import { SEARCH_SUGGESTION } from './search-input';
import { SearchInputLabelDirective } from './search-input-label.directive';

@Component({
  selector: 'core-search-input',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  host: {
    class: 'core-search-input',
    tabIndex: '0',
  },
  templateUrl: './search-input.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    }
  ]
})
export class SearchInputComponent extends EffectFn implements ControlValueAccessor {
  onChange?: (v: string | null | undefined) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  formControl = inject(FormBuilder).nonNullable.control(null as string | null | undefined);
  searchControl = inject(FormBuilder).nonNullable.control(null as string | null | undefined);

  @Input({ required: true }) sourceName!: string;
  @Input() set value(v: string | null | undefined) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<string | null | undefined>();
  @HostBinding('attr.data-popupvisible') hostPopupvisible = false;
  @ViewChild(SearchInputLabelDirective) label?: SearchInputLabelDirective;
  @ViewChild('searchPopup') private searchPopup!: TemplateRef<unknown>;

  private overlay = inject(OverlayService);
  overlayRef?: OverlayRefExtra;
  private _searchStr$ = new ReplaySubject<string | null | undefined>(1);
  suggestionSources = inject(SEARCH_SUGGESTION);
  private injector = inject(Injector);

  @HostListener('click', ['$event'])
  private hostClick = this.createEffectFn<MouseEvent>(args$ => args$.pipe(
    tap((event) => {
      if (this.isDisabled) return;
      if (this.overlayRef) return;
      if (this.suggestionSources.every(s => s.name !== this.sourceName)) return;
      if (!(event.currentTarget instanceof HTMLElement)) return;
      runInInjectionContext(this.injector, () => {
        this.hostPopupvisible = true;
        this.overlayRef = this.overlay.open(this.searchPopup, {
          positionStrategy: this.overlay.position().flexibleConnectedTo(event.currentTarget as HTMLElement)
            .withPositions([
              { overlayX: 'end', overlayY: 'top', originX: 'end', originY: 'bottom', offsetY: 4 },
            ]),
          scrollStrategy: this.overlay.scrollStrategies.reposition(),
          width: (event.currentTarget as HTMLElement).getBoundingClientRect().width,
          data: {
            source$: this._searchStr$.pipe(
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

  writeValue(obj: string | null | undefined): void {
    this.formControl.reset(obj);
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

  searchInput = this.createEffectFn<void>(args$ => args$.pipe(
    tap(() => this._searchStr$.next(this.searchControl.getRawValue()))
  ))

  handleInput() {
    if (this.isDisabled) return;
    this.onChange?.(this.formControl.getRawValue());
    this.valueChange.emit(this.formControl.getRawValue());
  }

}
