import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxHipsterModule } from 'ngx-hipster';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconService } from './icon.service';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxHipsterModule,
  ],
})
export class SharedModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private svgIconService: IconService,
    private domSanitizer: DomSanitizer
  ) {
    this.svgIconService.customerIcons.forEach(row => {
      this.matIconRegistry.addSvgIconLiteral(
        row.name,
        this.domSanitizer.bypassSecurityTrustHtml(row.tag)
      );
    });
  }
}
