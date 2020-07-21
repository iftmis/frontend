import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { inspectionActivitiesRoutes } from './inspection-activities.route';
import { InspectionActivitiesListComponent } from './inspection-activities-list/inspection-activities-list.component';
import { InspectionActivitiesDetailComponent } from './inspection-activities-detail/inspection-activities-detail.component';
import { InspectionActivitiesDeleteComponent } from './inspection-activities-delete/inspection-activities-delete.component';

@NgModule({
  declarations: [
    InspectionActivitiesListComponent,
    InspectionActivitiesDetailComponent,
    InspectionActivitiesDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(inspectionActivitiesRoutes)],
  exports: [],
})
export class InspectionActivitiesModule {}
