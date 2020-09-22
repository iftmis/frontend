import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { AccountService } from '../../user-management/user/account.service';
import { User } from '../../user-management/user/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Risk } from '../../risk-management/risk/risk';
import { Finding } from '../../finding-management/finding/finding';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  user$ = this.authenticationService.user$;
  loading$ = this.router.events.pipe(
    filter(
      event =>
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof NavigationStart
    ),
    map(event => (event instanceof NavigationStart ? true : false))
  );

  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
    return false;
  }
}
