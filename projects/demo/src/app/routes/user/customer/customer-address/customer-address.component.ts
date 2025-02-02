import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HoverableDirective } from 'portal-ui-ng/base';
import { TableModule } from 'portal-ui-ng/components';
import { map } from 'rxjs';
import { CustomerDataService } from '../../../../data/customer-data.service';

@Component({
  selector: 'demo-customer-address',
  imports: [
    TableModule,
    HoverableDirective,
    RouterLink,
    RouterLinkActive,
    NgClass,
    RouterOutlet,
  ],
  templateUrl: './customer-address.component.html',
  styles: ``,
  host: {
    class: 'contents'
  }
})
export class CustomerAddressComponent {
  private dataService = inject(CustomerDataService)
  private route = inject(ActivatedRoute)
  private list = toSignal(this.dataService.getList())
  private id = toSignal(this.route.params.pipe(map(p => p['id'])))

  data = computed(() => {
    return this.list()?.find(c => c.id == this.id())?.savedAddresses ?? []
  })
}
