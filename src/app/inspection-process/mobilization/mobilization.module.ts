import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobilizationRoutingModule } from './mobilization-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MobilizationComponent } from './mobilization.component';

@NgModule({
  declarations: [MobilizationComponent],
  imports: [CommonModule, MobilizationRoutingModule, SharedModule, FormsModule],
})
export class MobilizationModule {}
