import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';
import { PreparationComponent } from './preparation/preparation.component';
import { MobilizationComponent } from './mobilization/mobilization.component';
import { ExecutionComponent } from './execution/execution.component';
import { ReportAndFollowupComponent } from './report-and-followup/report-and-followup.component';

const routes: Routes = [
  {
    path: '',
    component: PreparationComponent,
  },
  {
    path: 'preparation',
    component: PreparationComponent,
  },
  {
    path: 'mobilization',
    component: MobilizationComponent,
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
