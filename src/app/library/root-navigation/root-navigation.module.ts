import { NgModule } from '@angular/core';
import { RootNavigationComponent } from './root-navigation.component';
import { SomeChildrenHaveIconPipe } from './some-children-have-icon.pipe';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    RootNavigationComponent,
    SomeChildrenHaveIconPipe,
    UserDialogComponent,
  ],
  exports: [
    RootNavigationComponent,
  ]
})
export class RootNavigationModule { }
