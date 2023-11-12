import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'buttons',
    loadComponent: () => import('./buttons/buttons.component').then(c => c.ButtonsComponent),
  },
  {
    path: 'text',
    loadComponent: () => import('./text/text.component').then(c => c.TextComponent),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES),
  ],
  exports: [RouterModule],
})
export class AtomsModule { }
