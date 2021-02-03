import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User';
import {PackageRequest} from '../../models/PackageRequest';


@Injectable({providedIn: 'root'})
export class ApiServiceGet {

  constructor(private http: HttpClient) {
  }

  userListUrl = '/rest/user/list';
  userInfoUrl = '/rest/user/userInfo';
  packageRequestUrl = '/rest/package/getAllRequests';
  historyRequestsUrl = '/rest/package/getRequestHistory';
  myWarehouseRequestUrl = '/rest/package/myWarehouse';
  deletePackageRequestByIdUrl = '/rest/package/deletePackageRequest';
  restorePasswordUrl = '/sign-in/resetPassword';
  changePasswordUrl = '/sign-in/changePassword';


  searchByTrackCodeUrl = '/rest/operator/findByTrackCode';
  searchByRemoteAddressUrl = '/rest/operator/findByRemoteAddress';
  sendEmailUrl = '/rest/operator/sendEmailNotification';


  // tslint:disable-next-line:typedef
  getUsers() {
    return this.http.get<User[]>(this.userListUrl);
  }

  // tslint:disable-next-line:typedef
  getPackageRequests() {
    return this.http.get<PackageRequest[]>(this.packageRequestUrl);
  }

  // tslint:disable-next-line:typedef
  getUserInfo() {
    return this.http.get<User>(this.userInfoUrl);
  }

  // tslint:disable-next-line:typedef
  getRequestHistory() {
    return this.http.get<PackageRequest[]>(this.historyRequestsUrl);

  }

  // tslint:disable-next-line:typedef
  getWarehousePackages() {
    return this.http.get<PackageRequest[]>(this.myWarehouseRequestUrl);
  }

  // tslint:disable-next-line:typedef
  getPackageByTrackCode(trackCode: string) {
    return this.http.post<PackageRequest>(this.searchByTrackCodeUrl, trackCode);
  }

  // tslint:disable-next-line:typedef
  deletePackageById(id: number) {
    return this.http.delete(this.deletePackageRequestByIdUrl + `?id=${id}`);
  }

  // tslint:disable-next-line:typedef
  getUserByRemoteAddress(remoteAddress: string) {
    return this.http.get<User>(this.searchByRemoteAddressUrl + `?remoteAddress=${remoteAddress}`);
  }

  // tslint:disable-next-line:typedef
  sendEmailNotification(id: number, trackCode: string) {
    return this.http.post(this.sendEmailUrl, {id, trackCode});
  }

  // tslint:disable-next-line:typedef
  restorePassword(email: string) {
    return this.http.post<string>(this.restorePasswordUrl, email).toPromise();
  }

  // tslint:disable-next-line:typedef
  setNewPassword(password: string, token: string) {
    return this.http.post(this.changePasswordUrl, {password, token});
  }
}

