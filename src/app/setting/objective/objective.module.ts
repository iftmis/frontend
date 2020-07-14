import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { objectiveRoutes } from './objective.route';
import { ObjectiveListComponent } from './objective-list/objective-list.component';
import { ObjectiveDetailComponent } from './objective-detail/objective-detail.component';
import { ObjectiveDeleteComponent } from './objective-delete/objective-delete.component';

@NgModule({
  declarations: [
    ObjectiveListComponent,
    ObjectiveDetailComponent,
    ObjectiveDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(objectiveRoutes)],
  exports: [],
})
export class ObjectiveModule {}
