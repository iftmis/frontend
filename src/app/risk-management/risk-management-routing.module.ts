import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./risk-category/risk-category.module').then(
        m => m.RiskCategoryModule
      ),
  },
  {
    path: 'risk-categories',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./risk-category/risk-category.module').then(
        m => m.RiskCategoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskManagementRoutingModule {}
