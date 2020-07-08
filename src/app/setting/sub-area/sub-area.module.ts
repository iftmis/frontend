import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { subAreaRoutes } from './sub-area.route';
import { SubAreaListComponent } from './sub-area-list/sub-area-list.component';
import { SubAreaDetailComponent } from './sub-area-detail/sub-area-detail.component';
import { SubAreaDeleteComponent } from './sub-area-delete/sub-area-delete.component';

@NgModule({
  declarations: [
    SubAreaListComponent,
    SubAreaDetailComponent,
    SubAreaDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(subAreaRoutes)],
  exports: [],
})
export class SubAreaModule {}
