import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { userRoutes } from './user.route';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent, UserDeleteComponent],
  imports: [SharedModule, RouterModule.forChild(userRoutes)],
  exports: [],
})
export class UserModule {}
