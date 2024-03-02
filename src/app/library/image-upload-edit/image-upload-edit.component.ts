import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, map, pairwise, tap } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'core-image-upload-edit',
  standalone: true,
  imports: [
    SharedModule,
  ],
  host: {
    class: 'core-image-upload-edit'
  },
  templateUrl: './image-upload-edit.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadEditComponent),
      multi: true,
    }
  ]
})
export class ImageUploadEditComponent implements ControlValueAccessor {
  onChange?: (v: Blob | null | undefined) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  @Input() set value(v: Blob | null | undefined) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<Blob | null | undefined>();

  private blob$ = new BehaviorSubject<Blob | null | undefined>(undefined);
  blobDataUrl$ = this.blob$.pipe(
    map(blob => blob ? URL.createObjectURL(blob) : null),
  )

  constructor() {
    this.blobDataUrl$.pipe(
      pairwise(),
      tap(([oldUrl, newUrl]) => oldUrl && URL.revokeObjectURL(oldUrl)),
      takeUntilDestroyed(),
    ).subscribe();
  }

  writeValue(obj: Blob | null | undefined): void {
    this.blob$.next(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onFileChange(event: Event) {
    const fileInput = event.currentTarget as HTMLInputElement;
    if (fileInput.files?.[0]) {
      const blob = new Blob([fileInput.files[0]], { type: fileInput.files[0].type })
      this.blob$.next(blob);
      this.handleInput(blob);
    }
  }

  onResetClick(fileInput: HTMLInputElement) {
    this.blob$.next(null);
    fileInput.value = '';
    this.handleInput(null);
  }

  handleInput(value: Blob | null | undefined) {
    if (this.isDisabled) return;
    this.onChange?.(value);
    this.valueChange.emit(value);
  }

}
