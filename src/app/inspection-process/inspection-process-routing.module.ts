import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutionComponent } from './execution/execution.component';
import { ReportAndFollowupComponent } from './report-and-followup/report-and-followup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'preparation',
  },
  {
    path: 'preparation',
    loadChildren: () =>
      import('./preparation/preparation.module').then(m => m.PreparationModule),
  },
  {
    path: 'mobilization',
    loadChildren: () =>
      import('./mobilization/mobilization.module').then(
        m => m.MobilizationModule
      ),
  },
  {
    path: 'execution',
    component: ExecutionComponent,
  },
  {
    path: 'reporting-and-followup',
    component: ReportAndFollowupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionProcessRoutingModule {}
