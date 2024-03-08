import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MULTILINGUAL_LANGUAGES } from '../multilingual-text-edit/multilingual-text-edit.component';

@Component({
  selector: 'core-multilingual-text-display',
  standalone: true,
  imports: [],
  template: `
  @if (str != null) {
    {{ str }}
  } @else {
    <!-- TODO -->
    <span class="text-secondary">---</span>
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilingualTextDisplayComponent {
  private transloco = inject(TranslocoService);
  private langs = inject(MULTILINGUAL_LANGUAGES);

  @Input({ required: true }) value!: Record<string, string | null | undefined> | null | undefined;

  get str() {
    const currLang = this.transloco.getActiveLang();
    if (this.value == null) return null;
    if (this.value[currLang] != null) return this.value[currLang];
    for (let lang of this.langs) {
      if (this.value[lang] != null) return this.value[lang];
    }
    return null;
  }

}
