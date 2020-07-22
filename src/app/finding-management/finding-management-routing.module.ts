import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindingManagementComponent } from './finding-management.component';
import { RecommendationComponent } from './finding/recommendation/recommendation.component';

const routes: Routes = [
  {
    path: '',
    component: FindingManagementComponent,
  },
  {
    path: 'findings',
    component: FindingManagementComponent,
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
