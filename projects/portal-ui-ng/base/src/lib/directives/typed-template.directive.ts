import { Directive, TemplateRef, inject, input } from '@angular/core';

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
  readonly typeToken = input.required<T>({ alias: "typedTemplate" });

  private templateRef = inject(TemplateRef) as TemplateRef<T>;

  static ngTemplateContextGuard<T>(dir: TypedTemplateDirective<T>, ctx: unknown): ctx is T { return true; }

}
