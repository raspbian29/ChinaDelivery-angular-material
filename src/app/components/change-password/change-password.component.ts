import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {ApiServiceGet} from '../../services/api/ApiServiceGet';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  token = '';
  errors: any;
  password: any;
  confirmPassword: any;

  constructor(private activatedRoute: ActivatedRoute, private rs: ApiServiceGet) {
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
  }

  submit() {
    this.rs.setNewPassword(this.password, this.token).toPromise().then(res => this.errors);
  }
}
