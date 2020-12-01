import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User';
import {PackageRequest} from '../../models/PackageRequest';


@Injectable({providedIn: 'root'})
export class ApiServiceGet {

  constructor(private http: HttpClient) {
  }

  userListUrl = 'http://localhost:8443/rest/user/list';
  packageRequestUrl = 'http://localhost:8443/rest/package/getAllRequests';

  // tslint:disable-next-line:typedef
  getUsers() {
    return this.http.get<User[]>(this.userListUrl);
  }

  // tslint:disable-next-line:typedef
  getPackageRequests() {
    return this.http.get<PackageRequest[]>(this.packageRequestUrl);
  }

}
