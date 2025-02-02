import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { matchFormArrayLength } from 'portal-ui-ng';
import { ButtonModule, HoverableDirective, InputFieldComponent } from 'portal-ui-ng/base';
import { DividerComponent, ToggleComponent, TooltipDirective } from 'portal-ui-ng/components';
import { map } from 'rxjs';
import { AccessControlDataService } from '../../../../data/access-control-data.service';
import { EmployeeDataService } from '../../../../data/employee-data.service';
import { EmployeeStatus } from '../../../../data/user.types';

@Component({
  selector: 'demo-access-control-overall',
  imports: [
    DividerComponent,
    NgClass,
    HoverableDirective,
    RouterLink,
    ToggleComponent,
    FormsModule,
    ReactiveFormsModule,
    DividerComponent,
    InputFieldComponent,
    ButtonModule,
    TooltipDirective,
  ],
  templateUrl: './access-control-overall.component.html',
  styles: ``,
  host: {
    class: 'contents'
  }
})
export class AccessControlOverallComponent {
  private dataService = inject(AccessControlDataService)
  private employeeDataService = inject(EmployeeDataService)
  private route = inject(ActivatedRoute)
  private list = toSignal(this.dataService.getList())
  private employeeList = toSignal(this.employeeDataService.getList())
  private id = toSignal(this.route.params.pipe(map(p => p['id'])))

  accessControl = computed(() => {
    return this.list()?.find(a => a.id == this.id());
  })
  employee = computed(() => {
    return this.employeeList()?.find(e => e.id == this.accessControl()?.employeeId)
  })

  employeeStatus = EmployeeStatus;

  formGroup = inject(FormBuilder).nonNullable.group({
    isEnabled: [false],
    customer: inject(FormBuilder).nonNullable.group({
      canCreate: [false],
      canRead: [false],
      canUpdate: [false],
      canDelete: [false],
    }),
    employee: inject(FormBuilder).nonNullable.group({
      canCreate: [false],
      canRead: [false],
      canUpdate: [false],
      canDelete: [false],
    }),
    inventoryItem: inject(FormBuilder).nonNullable.group({
      canCreate: [false],
      canRead: [false],
      canUpdate: [false],
      canDelete: [false],
    }),
    location: inject(FormBuilder).nonNullable.group({
      isEnabled: [false],
      allowedIps: inject(FormBuilder).nonNullable.array([] as string[]),
      countries: inject(FormBuilder).nonNullable.array([] as string[]),
    })
  })

  constructor() {
    effect(() => {
      const value = this.accessControl();
      if (!value) return;
      untracked(() => {
        matchFormArrayLength(this.formGroup.controls.location.controls.allowedIps, value.conditions.location.allowedIps.length)
        matchFormArrayLength(this.formGroup.controls.location.controls.countries, value.conditions.location.countries.length)
        this.formGroup.setValue({
          isEnabled: value.isEnabled,
          customer: {
            canCreate: value.permissions.customer.canCreate,
            canRead: value.permissions.customer.canRead,
            canUpdate: value.permissions.customer.canUpdate,
            canDelete: value.permissions.customer.canDelete,
          },
          employee: {
            canCreate: value.permissions.employee.canCreate,
            canRead: value.permissions.employee.canRead,
            canUpdate: value.permissions.employee.canUpdate,
            canDelete: value.permissions.employee.canDelete,
          },
          inventoryItem: {
            canCreate: value.permissions.inventoryItem.canCreate,
            canRead: value.permissions.inventoryItem.canRead,
            canUpdate: value.permissions.inventoryItem.canUpdate,
            canDelete: value.permissions.inventoryItem.canDelete,
          },
          location: {
            isEnabled: value.conditions.location.isEnabled,
            allowedIps: value.conditions.location.allowedIps,
            countries: value.conditions.location.countries,
          }
        })
      })
    }, { allowSignalWrites: true })
  }

  onToggleAll(groupName: 'customer' | 'employee' | 'inventoryItem') {
    const v = (this.formGroup.getRawValue() as any)[groupName];
    const isAllOn = Object.values(v).every(bool => bool == true)
    if (isAllOn) {
      this.formGroup.get(groupName)?.setValue({
        canCreate: false,
        canRead: false,
        canUpdate: false,
        canDelete: false,
      })
    } else {
      this.formGroup.get(groupName)?.setValue({
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
      })
    }
  }
}
