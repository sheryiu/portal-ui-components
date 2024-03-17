import { ChangeDetectorRef, Component, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { DecorationSlotComponent } from '../decoration-slot/decoration-slot.component';

@Component({
  selector: 'mhw-decoration-slots-edit',
  standalone: true,
  imports: [
    SharedModule,
    DecorationSlotComponent,
  ],
  templateUrl: './decoration-slots-edit.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecorationSlotsEditComponent),
      multi: true,
    }
  ]
})
export class DecorationSlotsEditComponent implements ControlValueAccessor {
  onChange?: (v: number[]) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  @Input() set value(v: number[]) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<number[]>();

  slots: number[] = [];
  private cdr = inject(ChangeDetectorRef);

  writeValue(obj: number[] | null | undefined): void {
    this.slots = obj ?? [];
    this.cdr.markForCheck();
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

  addSlot() {
    this.slots = [...this.slots, 1];
    this.handleInput();
  }

  toggleSlot(atIndex: number) {
    const currSize = this.slots[atIndex];
    switch (currSize) {
      case 1:
      case 2:
      case 3: {
        this.slots = this.slots.map((size, _i) => _i === atIndex ? size + 1 : size);
        break;
      }
      case 4: {
        this.slots = this.slots.filter((_, _i) => _i !== atIndex);
        break;
      }
    }
    this.handleInput();
  }

  handleInput() {
    if (this.isDisabled) return;
    this.onChange?.(this.slots);
    this.valueChange.emit(this.slots);
  }

}
