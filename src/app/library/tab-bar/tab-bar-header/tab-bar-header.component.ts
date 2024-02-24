import { AfterViewInit, Component, ElementRef, Input, inject } from '@angular/core';
import { nanoid } from 'nanoid';
import { TabBarService } from '../tab-bar.service';

@Component({
  selector: 'core-tab-bar-header',
  standalone: true,
  imports: [],
  templateUrl: './tab-bar-header.component.html',
  styles: ``,
  host: {
    class: 'core-tab-bar-header',
  }
})
export class TabBarHeaderComponent implements AfterViewInit {
  private service = inject(TabBarService, { optional: true });
  id = nanoid();
  @Input() label?: string;
  private elRef = inject(ElementRef) as ElementRef<HTMLElement>;

  constructor() {
    this.service?.registerTab({
      id: this.id,
      label: this.label ?? this.elRef.nativeElement.innerText.trim(),
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.service?.updateTab({
        id: this.id,
        label: this.label ?? this.elRef.nativeElement.innerText.trim(),
      })
    })
  }
}
