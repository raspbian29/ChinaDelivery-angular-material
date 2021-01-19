import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import {MatDrawer} from '@angular/material/sidenav';
import {ApiServiceGet} from '../services/api/ApiServiceGet';
import {User} from '../models/User';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  user: User = new User();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public authService: AuthService,
              public rs: ApiServiceGet) {
  }


  logout(): void {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.userBehavior.subscribe(user => {
      this.user = user;
    });
  }


}
