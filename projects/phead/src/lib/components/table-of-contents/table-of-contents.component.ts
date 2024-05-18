import { Component, Input, contentChildren } from '@angular/core';
import { ScrollspyContainerDirective, ScrollspyDocumentContainerDirective } from '../../base';
import { TableOfContentsEntryDirective } from './table-of-contents-entry.directive';

@Component({
  selector: 'phead-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styles: ``
})
export class TableOfContentsComponent {
  entries = contentChildren(TableOfContentsEntryDirective);
  @Input() scrollspy?: ScrollspyContainerDirective | ScrollspyDocumentContainerDirective;

}
