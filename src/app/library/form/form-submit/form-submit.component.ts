import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'core-form-submit',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './form-submit.component.html',
  host: {
    class: 'core-form-submit',
  },
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({
          marginBottom: '-5rem',
          opacity: 0,
        }),
        animate('150ms ease-in-out', style({
          marginBottom: '0',
          opacity: 1,
        })),
      ]),
      transition(':leave', [
        style({
          marginBottom: '0',
          opacity: 1,
        }),
        animate('150ms ease-in-out', style({
          marginBottom: '-5rem',
          opacity: 0,
        })),
      ])
    ])
  ]
})
export class FormSubmitComponent {
  @Input({ transform: booleanAttribute }) dirty?: boolean;
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  @Output() saveClick = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();

}
