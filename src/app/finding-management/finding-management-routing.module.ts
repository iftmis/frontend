import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindingComponent } from './finding/finding.component';
import { RecommendationComponent } from './recommendation/recommendation.component';

const routes: Routes = [
  {
    path: '',
    component: FindingComponent,
  },
  {
    path: 'findings',
    component: FindingComponent,
  },
  {
    path: 'findings/:id/recommendations',
    component: RecommendationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindingManagementRoutingModule {}
