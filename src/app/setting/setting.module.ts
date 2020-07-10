import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SettingComponent],
  imports: [CommonModule, MaterialModule, SettingRoutingModule],
})
export class SettingModule {}
