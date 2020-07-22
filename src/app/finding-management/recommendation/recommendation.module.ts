import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationComponent } from './recommendation.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RecommendationComponent],
  exports: [],
  imports: [CommonModule, SharedModule],
})
export class RecommendationModule {}
