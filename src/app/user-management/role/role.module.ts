import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { roleRoutes } from './role.route';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleDeleteComponent } from './role-delete/role-delete.component';

@NgModule({
  declarations: [RoleListComponent, RoleDetailComponent, RoleDeleteComponent],
  imports: [SharedModule, RouterModule.forChild(roleRoutes)],
  exports: [],
})
export class RoleModule {}
