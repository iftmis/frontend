import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { gfsCodeRoutes } from './gfs-code.route';
import { GfsCodeListComponent } from './gfs-code-list/gfs-code-list.component';
import { GfsCodeDetailComponent } from './gfs-code-detail/gfs-code-detail.component';
import { GfsCodeDeleteComponent } from './gfs-code-delete/gfs-code-delete.component';

@NgModule({
  declarations: [
    GfsCodeListComponent,
    GfsCodeDetailComponent,
    GfsCodeDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(gfsCodeRoutes)],
  exports: [],
})
export class GfsCodeModule {}
