import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobilizationRoutingModule } from './mobilization-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MobilizationComponent } from './mobilization.component';
import { InspectionIndicatorListComponent } from './inspection-program/inspection-indicator-list/inspection-indicator-list.component';
import { InspectionIndicatorDetailComponent } from './inspection-program/inspection-indicator-detail/inspection-indicator-detail.component';
import { InspectionIndicatorDeleteComponent } from './inspection-program/inspection-indicator-delete/inspection-indicator-delete.component';
import { InspectionProcedureListComponent } from './inspection-program/inspection-procedure-list/inspection-procedure-list.component';
import { InspectionProcedureDetailComponent } from './inspection-program/inspection-procedure-detail/inspection-procedure-detail.component';
import { InspectionProcedureDeleteComponent } from './inspection-program/inspection-procedure-delete/inspection-procedure-delete.component';
import { TreeModule } from 'angular-tree-component';
import { InspectionBudgetDeleteComponent } from './inspection-budget/inspection-budget-delete/inspection-budget-delete.component';
import { InspectionBudgetDetailComponent } from './inspection-budget/inspection-budget-detail/inspection-budget-detail.component';
import { InspectionBudgetListComponent } from './inspection-budget/inspection-budget-list/inspection-budget-list.component';

@NgModule({
  declarations: [
    MobilizationComponent,
    InspectionIndicatorListComponent,
    InspectionIndicatorDetailComponent,
    InspectionIndicatorDeleteComponent,
    InspectionProcedureListComponent,
    InspectionProcedureDetailComponent,
    InspectionProcedureDeleteComponent,
    InspectionBudgetDeleteComponent,
    InspectionBudgetDetailComponent,
    InspectionBudgetListComponent,
  ],
  imports: [
    CommonModule,
    MobilizationRoutingModule,
    SharedModule,
    FormsModule,
    TreeModule,
  ],
})
export class MobilizationModule {}
