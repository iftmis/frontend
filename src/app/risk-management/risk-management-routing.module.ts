import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./risk-register/risk-register.module').then(
        m => m.RiskRegisterModule
      ),
  },
  {
    path: 'risk-register',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./risk-register/risk-register.module').then(
        m => m.RiskRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskManagementRoutingModule {}
