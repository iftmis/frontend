import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindingConfirmationComponent } from './confirmation/finding-confirmation.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';
import { TreeModule } from 'angular-tree-component';
import { FindingComponent } from './finding.component';

@NgModule({
  declarations: [
    FindingConfirmationComponent,
    FindingComponent,
    ListComponent,
    FormComponent,
  ],
  exports: [ListComponent],
  imports: [CommonModule, SharedModule, TreeModule.forRoot()],
})
export class FindingModule {}
