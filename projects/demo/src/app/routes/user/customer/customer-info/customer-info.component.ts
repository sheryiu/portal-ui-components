import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TimeDisplayComponent } from "portal-ui-ng";
import { map } from 'rxjs';
import { CustomerDataService } from '../../../../data/customer-data.service';

@Component({
  selector: 'demo-customer-info',
  standalone: true,
  imports: [TimeDisplayComponent],
  templateUrl: './customer-info.component.html',
  styles: ``,
  host: {
    class: 'contents'
  }
})
export class CustomerInfoComponent {
  private dataService = inject(CustomerDataService)
  private route = inject(ActivatedRoute)
  private list = toSignal(this.dataService.getList())
  private id = toSignal(this.route.params.pipe(map(p => p['id'])))

  data = computed(() => {
    return this.list()?.find(c => c.id == this.id());
  })
}
