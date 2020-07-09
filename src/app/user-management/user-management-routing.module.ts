import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'permissions',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./permission/permission.module').then(m => m.PermissionModule),
  },
  {
    path: 'roles',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
  },
  {
    path: 'users',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
