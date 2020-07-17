import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreparationRoutingModule } from './preparation-routing.module';
import { PreparationComponent } from './preparation.component';
import { InspectionMemberListComponent } from './inspection-member/inspection-member-list/inspection-member-list.component';
import { InspectionMemberDetailComponent } from './inspection-member/inspection-member-detail/inspection-member-detail.component';
import { InspectionMemberDeleteComponent } from './inspection-member/inspection-member-delete/inspection-member-delete.component';
import { InspectionObjectiveDeleteComponent } from './inspection-objective/inspection-objective-delete/inspection-objective-delete.component';
import { InspectionObjectiveListComponent } from './inspection-objective/inspection-objective-list/inspection-objective-list.component';
import { InspectionObjectiveDetailComponent } from './inspection-objective/inspection-objective-detail/inspection-objective-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

// @ts-ignore
@NgModule({
  declarations: [
    PreparationComponent,
    InspectionMemberListComponent,
    InspectionMemberDetailComponent,
    InspectionMemberDeleteComponent,
    InspectionObjectiveDeleteComponent,
    InspectionObjectiveListComponent,
    InspectionObjectiveDetailComponent,
  ],
  imports: [CommonModule, PreparationRoutingModule, SharedModule, FormsModule],
})
export class PreparationModule {}
