import { Directive, Input, TemplateRef, inject } from '@angular/core';


/**
 * Declare a property in .ts like:
 * ```typescript
 * typeForTemplateRef!: {
 *   $implicit: YOUR_TYPE;
 * };
 * ```
 *
 * Then, use in .html like:
 * ```html
 * <ng-template [typedTemplate]="typeForTemplateRef"></ng-template>
 * ```
 */
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
