import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  year = new Date();
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.authenticationService.fetchUserInfoWhenAuthenticated().subscribe();
  }
}
