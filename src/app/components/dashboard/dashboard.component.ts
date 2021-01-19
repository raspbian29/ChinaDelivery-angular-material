import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = new User();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.userBehavior.subscribe(user => {
      this.user = user;
    });
  }
}
