import { Component, ContentChild, Directive, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, inject } from '@angular/core';
import { HardSurfaceDirective } from '../../components/color/hard-surface.directive';
import { SharedModule } from '../../shared/shared.module';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Directive({
  selector: '[coreHeader]',
})
export class HeaderDirective {
  templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[coreHeaderActions]',
})
export class HeaderActionsDirective {
  templateRef = inject(TemplateRef);
}

@Component({
  selector: 'core-simple-header',
  standalone: true,
  imports: [
    SharedModule,
    BreadcrumbsComponent,
  ],
  host: {
    class: 'core-simple-header',
    ngSkipHydration: 'true'
  },
  template: `
    <!-- don't use defer here to solve the duplication bug -->
    <!-- https://github.com/angular/angular/issues/48224 -->
    <!-- don't use cdkPortalOutlet because it will not wait for animation to end -->
    <div class="flex flex-col gap-2 w-full">
      <core-breadcrumbs class="-ms-1.5"></core-breadcrumbs>
      @if (header?.templateRef) {
        <ng-container [ngTemplateOutlet]="header!.templateRef"></ng-container>
      }
    </div>
    <div class="flex gap-1">
      @if (headerActions?.templateRef) {
        <ng-container [ngTemplateOutlet]="headerActions!.templateRef"></ng-container>
      }
    </div>
  `,
  hostDirectives: [
    {
      directive: HardSurfaceDirective,
      inputs: ['color']
    }
  ]
})
export class SimpleHeaderComponent {
  @ContentChild(HeaderDirective) header?: HeaderDirective;
  @ContentChild(HeaderActionsDirective) headerActions?: HeaderActionsDirective;
  @Output() bgClick = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  private hostClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.bgClick.emit();
    } else if (!(event.target as HTMLElement).closest('a, button')) {
      this.bgClick.emit();
    }
  }
}