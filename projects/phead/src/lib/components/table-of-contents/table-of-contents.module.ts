import { NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableOfContentsEntryDirective } from './table-of-contents-entry.directive';
import { TableOfContentsComponent } from './table-of-contents.component';

@NgModule({
  declarations: [
    TableOfContentsComponent,
    TableOfContentsEntryDirective
  ],
  imports: [
    NgTemplateOutlet,
  ],
  exports: [
    TableOfContentsComponent,
    TableOfContentsEntryDirective
  ]
})
export class TableOfContentsModule { }
