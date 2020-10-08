import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent,
    WelcomeComponent,
    SidenavComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [],
})
export class LayoutModule {}
