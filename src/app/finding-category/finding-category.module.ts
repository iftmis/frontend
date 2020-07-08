import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { findingCategoryRoutes } from './finding-category.route';
import { FindingCategoryListComponent } from './finding-category-list/finding-category-list.component';
import { FindingCategoryDetailComponent } from './finding-category-detail/finding-category-detail.component';
import { FindingCategoryDeleteComponent } from './finding-category-delete/finding-category-delete.component';

@NgModule({
  declarations: [
    FindingCategoryListComponent,
    FindingCategoryDetailComponent,
    FindingCategoryDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(findingCategoryRoutes)],
  exports: [],
})
export class FindingCategoryModule {}
