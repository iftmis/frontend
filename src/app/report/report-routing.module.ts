import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../security/authenticated-user.guard';
import { CagComponent } from './cag/cag.component';

const routes: Routes = [
  {
    path: '',
    component: CagComponent,
  },
  {
    path: 'cag',
    component: CagComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
