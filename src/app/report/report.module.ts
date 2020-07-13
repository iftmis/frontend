import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { SharedModule } from '../shared/shared.module';
import { ReportRoutingModule } from './report-routing.module';
import { CagComponent } from './cag/cag.component';

@NgModule({
  declarations: [ReportComponent, CagComponent],
  imports: [CommonModule, SharedModule, ReportRoutingModule],
})
export class ReportModule {}
