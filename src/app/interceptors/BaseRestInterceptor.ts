import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';

export const BASE_REST_URL = 'http://localhost:8443';


@Injectable()
export class BaseRestInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {};
    const authToken = this.authService.getTokenKey();
    if (authToken) {
      // @ts-ignore
      headers.Authorization = authToken;
    }
    const rClone = req.clone({
      url: `${req.url.startsWith('http') ? '' : BASE_REST_URL}${req.url}`,
      setHeaders: headers
    });
    return next.handle(rClone);
  }
}
