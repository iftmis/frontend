import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationComponent } from './recommendation.component';
import { SharedModule } from '../../shared/shared.module';
import { FormComponent } from './form/form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [RecommendationComponent, FormComponent, ConfirmationComponent],
  exports: [],
  imports: [CommonModule, SharedModule],
})
export class RecommendationModule {}
