import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { inspectionRoutes } from './inspection.route';
import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionDeleteComponent } from './inspection-delete/inspection-delete.component';

@NgModule({
  declarations: [
    InspectionListComponent,
    InspectionDetailComponent,
    InspectionDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(inspectionRoutes)],
  exports: [],
})
export class InspectionModule {}
