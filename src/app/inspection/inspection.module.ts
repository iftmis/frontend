import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { inspectionRoutes } from './inspection.route';
import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionDeleteComponent } from './inspection-delete/inspection-delete.component';
import { InspectionComponent } from './inspection.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [
    InspectionListComponent,
    InspectionDetailComponent,
    InspectionDeleteComponent,
    InspectionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(inspectionRoutes),
    TreeModule.forRoot(),
  ],
  exports: [],
})
export class InspectionModule {}
