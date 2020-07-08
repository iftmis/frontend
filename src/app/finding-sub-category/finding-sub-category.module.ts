import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { findingSubCategoryRoutes } from './finding-sub-category.route';
import { FindingSubCategoryListComponent } from './finding-sub-category-list/finding-sub-category-list.component';
import { FindingSubCategoryDetailComponent } from './finding-sub-category-detail/finding-sub-category-detail.component';
import { FindingSubCategoryDeleteComponent } from './finding-sub-category-delete/finding-sub-category-delete.component';

@NgModule({
  declarations: [
    FindingSubCategoryListComponent,
    FindingSubCategoryDetailComponent,
    FindingSubCategoryDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(findingSubCategoryRoutes)],
  exports: [],
})
export class FindingSubCategoryModule {}
