import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreparationComponent } from './preparation.component';

const routes: Routes = [
  {
    path: '',
    component: PreparationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreparationRoutingModule {}
