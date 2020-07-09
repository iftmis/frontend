import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';
import { DeleteComponent } from './delete/delete.component';
import { RouterModule } from '@angular/router';
import { roleRoutes } from './role-route';

@NgModule({
  declarations: [ListComponent, FormComponent, DeleteComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(roleRoutes)],
})
export class RoleModule {}
