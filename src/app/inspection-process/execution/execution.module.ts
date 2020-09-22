import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ExecutionComponent } from './execution.component';
import { FormsModule } from '@angular/forms';
import { CourtesyComponent } from './courtesy/courtesy.component';
import { BriefyingComponent } from './briefying/briefying.component';
import { CourtesyDetailComponent } from './courtesy/courtesy-detail/courtesy-detail.component';
import { BriefyingDetailComponent } from './briefying/briefying-detail/briefying-detail.component';
import { CourtesyDeleteComponent } from './courtesy/courtesy-delete/courtesy-delete.component';
import { BriefyingDeleteComponent } from './briefying/briefying-delete/briefying-delete.component';

@NgModule({
  declarations: [
    ExecutionComponent,
    CourtesyComponent,
    BriefyingComponent,
    CourtesyDetailComponent,
    BriefyingDetailComponent,
    CourtesyDeleteComponent,
    BriefyingDeleteComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class ExecutionModule {}
