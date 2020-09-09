import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { inspectionActivitiesRoutes } from './inspection-activities.route';
import { InspectionActivitiesListComponent } from './inspection-activities-list/inspection-activities-list.component';
import { InspectionActivitiesDetailComponent } from './inspection-activities-detail/inspection-activities-detail.component';
import { InspectionActivitiesDeleteComponent } from './inspection-activities-delete/inspection-activities-delete.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InspectionActivitiesListComponent,
    InspectionActivitiesDetailComponent,
    InspectionActivitiesDeleteComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(inspectionActivitiesRoutes),
    FormsModule,
  ],
  exports: [],
})
export class InspectionActivitiesModule {}
