import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';
import { AnonymousUserGuard } from './security/anonymous-user.guard';
import { PageNotFoundComponent } from './layout/error/page-not-found/page-not-found.component';
import { AuthenticatedUserGuard } from './security/authenticated-user.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    canActivate: [AnonymousUserGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'auditable-areas',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./auditable-area/auditable-area.module').then(
        m => m.AuditableAreaModule
      ),
  },
  {
    path: 'financial-years',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./financial-year/financial-year.module').then(
        m => m.FinancialYearModule
      ),
  },
  {
    path: 'organisation-unit-levels',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./organisation-unit-level/organisation-unit-level.module').then(
        m => m.OrganisationUnitLevelModule
      ),
  },
  {
    path: 'organisation-units',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./organisation-unit/organisation-unit.module').then(
        m => m.OrganisationUnitModule
      ),
  },
  {
    path: 'gfs-codes',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./gfs-code/gfs-code.module').then(m => m.GfsCodeModule),
  },
  {
    path: 'finding-categories',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./finding-category/finding-category.module').then(
        m => m.FindingCategoryModule
      ),
  },
  {
    path: 'quarters',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./quarter/quarter.module').then(m => m.QuarterModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
