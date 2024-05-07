import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Injector, Input, OnChanges, OnDestroy, Output, SimpleChanges, forwardRef, inject, runInInjectionContext } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { Observable, ReplaySubject, startWith, tap } from 'rxjs';
import { HoverableDirective, InputFieldDirective } from '../../../base';
import { SEARCH_SUGGESTION, SearchInputLabelDirective, SearchInputSuggestionItemDirective, SearchSuggestion } from '../../form';

@Component({
  selector: 'phead-table-filter-by-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgTemplateOutlet,
    ScrollingModule,
    InputFieldDirective,
    HoverableDirective,
  ],
  templateUrl: './table-filter-by-search.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableFilterBySearchComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterBySearchComponent<T> extends EffectFn implements ControlValueAccessor, OnChanges, OnDestroy {
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
  @ContentChild(SearchInputLabelDirective) label?: SearchInputLabelDirective;
  @ContentChild(SearchInputSuggestionItemDirective) item?: SearchInputSuggestionItemDirective;

  private _searchStr$ = new ReplaySubject<string | null | undefined>(1);
  suggestionSources = inject(SEARCH_SUGGESTION);
  source$?: Observable<SearchSuggestion[] | null>;
  private injector = inject(Injector);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    runInInjectionContext(this.injector, () => {
      if (changes['sourceName'] && changes['sourceName'].currentValue != changes['sourceName'].previousValue && this.suggestionSources.some(s => s.name === this.sourceName)) {
        this.source$ = this._searchStr$.pipe(
          startWith(null as string | null | undefined),
          this.suggestionSources.find(s => s.name === this.sourceName)?.source!
        )
      }
    })
  }

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
  }

  unsetValue() {
    if (this.isDisabled) return;
    this.formControl.setValue(null as T);
    this.formControl.markAsDirty();
    this.handleInput();
  }

  handleInput() {
    if (this.isDisabled) return;
    let value = this.formControl.getRawValue();
    if (typeof value === 'string') {
      if (value.trim().length === 0) value = null as T;
    }
    this.onChange?.(value);
    this.valueChange.emit(value);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._searchStr$.complete();
  }

}
