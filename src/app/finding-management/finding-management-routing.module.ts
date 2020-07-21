import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindingManagementComponent } from './finding-management.component';

const routes: Routes = [
  {
    path: '',
    component: FindingManagementComponent,
  },
  {
    path: 'findings',
    component: FindingManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindingManagementRoutingModule {}
