import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    CommonModule,
    ComponentsModule,
  ]
})
export class SharedModule { }
