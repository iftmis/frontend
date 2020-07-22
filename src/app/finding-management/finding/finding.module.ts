import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';
import { FindingConfirmationComponent } from './confirmation/finding-confirmation.component';
import { RecommendationComponent } from './recommendation/recommendation.component';

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    FindingConfirmationComponent,
    RecommendationComponent,
  ],
  exports: [ListComponent],
  imports: [CommonModule, SharedModule],
})
export class FindingModule {}
