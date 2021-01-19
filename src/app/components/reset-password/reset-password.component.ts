import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ApiServiceGet} from '../../services/api/ApiServiceGet';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errors = null;
  successMsg = null;

  constructor(public fb: FormBuilder, public rs: ApiServiceGet) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.resetForm.value.email);
    this.rs.restorePassword(this.resetForm.value.email);
  }
}
