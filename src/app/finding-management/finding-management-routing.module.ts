import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./finding-sub-category/finding-sub-category.module').then(
        m => m.FindingSubCategoryModule
      ),
  },
  {
    path: 'finding-sub-categories',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./finding-sub-category/finding-sub-category.module').then(
        m => m.FindingSubCategoryModule
      ),
  },
  {
    path: 'finding-categories',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./finding-category/finding-category.module').then(
        m => m.FindingCategoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindingManagementRoutingModule {}
