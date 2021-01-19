import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChinaBox';

  constructor(private authService: AuthService) {
    if (authService.getTokenKey()) {
      authService.buildUserProfile();
    }
    authService.loginBehavior.subscribe(val => {
      if (val === true) {
        authService.buildUserProfile();
      }
    });
  }

  ngOnInit(): void {
  }
}
