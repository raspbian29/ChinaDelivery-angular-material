import {Component, OnInit} from '@angular/core';
import {PackageRequest} from '../../models/PackageRequest';
import {HttpClient} from '@angular/common/http';
import {ApiServiceGet} from '../../services/api/ApiServiceGet';
import {User} from '../../models/User';

@Component({
  selector: 'app-package-validation',
  templateUrl: './package-validation.component.html',
  styleUrls: ['./package-validation.component.css']
})
export class PackageValidationComponent {

  constructor(private  httpClient: HttpClient, private rs: ApiServiceGet) {
  }

  packageRequest: PackageRequest = new PackageRequest();
  user: User = new User();

  trackCode: string;
  remoteAddress: string;
  email: string;


  searchByTrackCode() {
    this.rs.getPackageByTrackCode(this.trackCode).subscribe(res => this.packageRequest = res);
  }

  searchByRemoteAddress() {
    this.rs.getUserByRemoteAddress(this.remoteAddress).subscribe(res => this.user = res);
  }

  sendEmailNotification(user: User, trackCode: string) {
    this.rs.sendEmailNotification(user.id, trackCode).toPromise().then(res => console.log(res));

  }
}
