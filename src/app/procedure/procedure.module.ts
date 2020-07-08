import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { procedureRoutes } from './procedure.route';
import { ProcedureListComponent } from './procedure-list/procedure-list.component';
import { ProcedureDetailComponent } from './procedure-detail/procedure-detail.component';
import { ProcedureDeleteComponent } from './procedure-delete/procedure-delete.component';

@NgModule({
  declarations: [
    ProcedureListComponent,
    ProcedureDetailComponent,
    ProcedureDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(procedureRoutes)],
  exports: [],
})
export class ProcedureModule {}
