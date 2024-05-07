import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'mhw-loading-footer',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './loading-footer.component.html',
  host: {
    class: 'col-span-full'
  }
})
export class LoadingFooterComponent {

}
