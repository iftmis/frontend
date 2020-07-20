import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';
import { AnonymousUserGuard } from './security/anonymous-user.guard';
import { PageNotFoundComponent } from './layout/error/page-not-found/page-not-found.component';
import { AuthenticatedUserGuard } from './security/authenticated-user.guard';
import { SettingComponent } from './setting/setting.component';
import { InspectionComponent } from './inspection/inspection.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RiskManagementComponent } from './risk-management/risk-management.component';
import { ReportComponent } from './report/report.component';
import { FindingManagementComponent } from './finding-management/finding-management.component';
import { InspectionProcessComponent } from './inspection-process/inspection-process.component';
import { InspectionResolver } from './inspection/inspection.resolver';
import { InspectionPlanningComponent } from './inspection-planning/inspection-planning.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    canActivate: [AnonymousUserGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'settings',
    component: SettingComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./setting/setting.module').then(m => m.SettingModule),
  },
  {
    path: 'inspections',
    component: InspectionComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection/inspection.module').then(m => m.InspectionModule),
  },
  {
    path: 'inspection-planning',
    component: InspectionPlanningComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection-planning/inspection-planning.module').then(
        m => m.InspectionPlanningModule
      ),
  },
  {
    path: 'inspection-process/:id',
    component: InspectionProcessComponent,
    resolve: {
      inspection: InspectionResolver,
    },
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection-process/inspection-process.module').then(
        m => m.InspectionProcessModule
      ),
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        m => m.UserManagementModule
      ),
  },
  {
    path: 'risk-management',
    component: RiskManagementComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./risk-management/risk-management.module').then(
        m => m.RiskManagementModule
      ),
  },
  {
    path: 'finding-management',
    component: FindingManagementComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./finding-management/finding-management.module').then(
        m => m.FindingManagementModule
      ),
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./report/report.module').then(m => m.ReportModule),
  },
  {
    path: 'inspection-plans',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import(
        './inspection-planning/inspection-plan/inspection-plan.module'
      ).then(m => m.InspectionPlanModule),
  },
  {
    path: 'inspection-activities',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () =>
      import('./inspection-activities/inspection-activities.module').then(
        m => m.InspectionActivitiesModule
      ),
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
