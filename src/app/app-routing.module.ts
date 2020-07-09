import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';
import { AnonymousUserGuard } from './security/anonymous-user.guard';
import { PageNotFoundComponent } from './layout/error/page-not-found/page-not-found.component';
import { AuthenticatedUserGuard } from './security/authenticated-user.guard';
import { SettingComponent } from './setting/setting.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    canActivate: [AnonymousUserGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'settings',
    component: SettingComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./setting/setting.module').then(m => m.SettingModule),
  },
  {
    path: 'inspections',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection/inspection.module').then(m => m.InspectionModule),
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        m => m.UserManagementModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
