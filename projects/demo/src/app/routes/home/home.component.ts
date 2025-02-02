import { Component, forwardRef, signal } from '@angular/core';
import { TabConfig, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Component({
  selector: 'demo-home',
  imports: [
    VerticalLayoutComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``,
  providers: [
    {
      provide: VERTICAL_LAYOUT_DATA_PROVIDER,
      useExisting: forwardRef(() => HomeComponent)
    }
  ]
})
export class HomeComponent implements VerticalLayoutDataProvider {
  heading = signal('Portal UI Demo')
  tabs = signal<TabConfig[]>([])
}
