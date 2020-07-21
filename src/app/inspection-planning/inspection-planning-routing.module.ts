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
  {
    path: 'inspection-planning',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection-plan/inspection-plan.module').then(
        m => m.InspectionPlanModule
      ),
  },
  {
    path: 'inspection-activities',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection-activities/inspection-activities.module').then(
        m => m.InspectionActivitiesModule
      ),
  },
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionPlanningRoutingModule {}
