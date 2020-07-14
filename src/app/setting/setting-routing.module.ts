import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./indicator/indicator.module').then(m => m.IndicatorModule),
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
    path: 'sub-areas',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./sub-area/sub-area.module').then(m => m.SubAreaModule),
  },
  {
    path: 'indicators',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./indicator/indicator.module').then(m => m.IndicatorModule),
  },
  {
    path: 'procedures',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./procedure/procedure.module').then(m => m.ProcedureModule),
  },
  {
    path: 'quarters',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./quarter/quarter.module').then(m => m.QuarterModule),
  },
  {
    path: 'risk-categories',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./risk-category/risk-category.module').then(
        m => m.RiskCategoryModule
      ),
  },
  {
    path: 'objectives',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./objective/objective.module').then(m => m.ObjectiveModule),
  },
  {
    path: 'risk-ranks',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./risk-rank/risk-rank.module').then(m => m.RiskRankModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
