import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreparationRoutingModule } from './preparation-routing.module';
import { PreparationComponent } from './preparation.component';
import { InspectionMemberListComponent } from './inspection-member/inspection-member-list/inspection-member-list.component';
import { InspectionMemberDetailComponent } from './inspection-member/inspection-member-detail/inspection-member-detail.component';
import { InspectionMemberDeleteComponent } from './inspection-member/inspection-member-delete/inspection-member-delete.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InspectionSubAreaListComponent } from './inspection-sub-area/inspection-sub-area-list/inspection-sub-area-list.component';
import { InspectionSubAreaDetailComponent } from './inspection-sub-area/inspection-sub-area-detail/inspection-sub-area-detail.component';
import { InspectionSubAreaDeleteComponent } from './inspection-sub-area/inspection-sub-area-delete/inspection-sub-area-delete.component';

// @ts-ignore
@NgModule({
  declarations: [
    PreparationComponent,
    InspectionMemberListComponent,
    InspectionMemberDetailComponent,
    InspectionMemberDeleteComponent,
    InspectionSubAreaListComponent,
    InspectionSubAreaDetailComponent,
    InspectionSubAreaDeleteComponent,
  ],
  imports: [CommonModule, PreparationRoutingModule, SharedModule, FormsModule],
})
export class PreparationModule {}
