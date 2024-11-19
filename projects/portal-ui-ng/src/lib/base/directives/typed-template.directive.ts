import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[typedTemplate]',
  standalone: true
})
export class TypedTemplateDirective<T> {
  @Input('typedTemplate')
  typeToken!: T;

  private templateRef = inject(TemplateRef) as TemplateRef<T>;

  static ngTemplateContextGuard<T>(dir: TypedTemplateDirective<T>, ctx: unknown): ctx is T { return true; }

}
