import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { quarterRoutes } from './quarter.route';
import { QuarterListComponent } from './quarter-list/quarter-list.component';
import { QuarterDetailComponent } from './quarter-detail/quarter-detail.component';
import { QuarterDeleteComponent } from './quarter-delete/quarter-delete.component';

@NgModule({
  declarations: [
    QuarterListComponent,
    QuarterDetailComponent,
    QuarterDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(quarterRoutes)],
  exports: [],
})
export class QuarterModule {}
