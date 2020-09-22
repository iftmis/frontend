import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxHipsterModule } from 'ngx-hipster';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconService } from './icon.service';
import { InspectionBudgetDeleteComponent } from '../inspection-process/inspection-budget/inspection-budget-delete/inspection-budget-delete.component';
import { InspectionBudgetDetailComponent } from '../inspection-process/inspection-budget/inspection-budget-detail/inspection-budget-detail.component';
import { InspectionBudgetListComponent } from '../inspection-process/inspection-budget/inspection-budget-list/inspection-budget-list.component';
import { InspectionWorkDoneListComponent } from '../inspection-process/inspection-work-done/inspection-work-done-list/inspection-work-done-list.component';
import { InspectionWorkDoneDetailComponent } from '../inspection-process/inspection-work-done/inspection-work-done-detail/inspection-work-done-detail.component';
import { InspectionWorkDoneDeleteComponent } from '../inspection-process/inspection-work-done/inspection-work-done-delete/inspection-work-done-delete.component';
import { InspectionFindingListComponent } from '../inspection-process/inspection-finding/inspection-finding-list/inspection-finding-list.component';
import { InspectionFindingDetailComponent } from '../inspection-process/inspection-finding/inspection-finding-detail/inspection-finding-detail.component';
import { InspectionFindingDeleteComponent } from '../inspection-process/inspection-finding/inspection-finding-delete/inspection-finding-delete.component';

@NgModule({
  declarations: [
    InspectionBudgetDeleteComponent,
    InspectionBudgetDetailComponent,
    InspectionBudgetListComponent,
    InspectionWorkDoneListComponent,
    InspectionWorkDoneDetailComponent,
    InspectionWorkDoneDeleteComponent,
    InspectionFindingListComponent,
    InspectionFindingDetailComponent,
    InspectionFindingDeleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxHipsterModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxHipsterModule,
    FormsModule,
    InspectionBudgetDeleteComponent,
    InspectionBudgetDetailComponent,
    InspectionBudgetListComponent,
    InspectionWorkDoneListComponent,
    InspectionWorkDoneDetailComponent,
    InspectionWorkDoneDeleteComponent,
    InspectionFindingListComponent,
    InspectionFindingDetailComponent,
    InspectionFindingDeleteComponent,
  ],
})
export class SharedModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private svgIconService: IconService,
    private domSanitizer: DomSanitizer
  ) {
    this.svgIconService.customerIcons.forEach(row => {
      this.matIconRegistry.addSvgIconLiteral(
        row.name,
        this.domSanitizer.bypassSecurityTrustHtml(row.tag)
      );
    });
  }
}
