import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection-plan/inspection-plan.module').then(
        m => m.InspectionPlanModule
      ),
  },
  // {
  //   path: 'risk-register',
  //   canActivateChild: [AuthenticatedUserGuard],
  //   loadChildren: () =>
  //     import('./inspection-plan/risk-register.module').then(
  //       m => m.RiskRegisterModule
  //     ),
  // },
  //
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionPlanningRoutingModule {}
