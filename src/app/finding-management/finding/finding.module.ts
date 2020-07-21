import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListComponent, FormComponent],
  exports: [ListComponent],
  imports: [CommonModule, SharedModule],
})
export class FindingModule {}
