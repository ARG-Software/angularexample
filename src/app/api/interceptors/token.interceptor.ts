import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiAuthService } from '../services/api-auth.service';
import { Subject } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private tokenRefreshedSource = new Subject();
  private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
  private apiAuth: ApiAuthService;

  constructor(private injector: Injector) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.apiAuth = this.injector.get(ApiAuthService);
    request = this.apiAuth.addAuthHeader(request);
    return next.handle(request).catch((error) => {
      switch (error.status) {
          case 401:
          return this.refreshToken()
              .switchMap((token: string) => {
                  this.apiAuth.updateAccessToken(token);
                  request = this.apiAuth.addAuthHeader(request);
                  return next.handle(request);
              })
              .catch(() => {
                  this.apiAuth.logout();
                  return Observable.empty();
              });
      }

      return Observable.throw(error);
  });
  }

  private refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
        return new Observable((observer) => {
            this.tokenRefreshed$.subscribe(() => {
                observer.next();
                observer.complete();
            });
        });
    } else {
        this.refreshTokenInProgress = true;

        return this.apiAuth.getNewAccessToken()
           .do(() => {
                this.refreshTokenInProgress = false;
                this.tokenRefreshedSource.next();
                // this.apiAuth.updateAccessToken(data as string);
              });
    }
}
}
