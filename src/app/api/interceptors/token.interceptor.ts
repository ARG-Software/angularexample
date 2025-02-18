import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiAuthService } from '../services/api-auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private tokenRefreshedSource = new Subject<string>();
  private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private apiAuth: ApiAuthService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.apiAuth.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.refreshToken().pipe(
            switchMap((token: string) => {
              this.apiAuth.updateAccessToken(token);
              request = this.apiAuth.addAuthHeader(request);
              return next.handle(request);
            }),
            catchError(() => {
              this.apiAuth.logout();
              return EMPTY;
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  private refreshToken(): Observable<string> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe((token) => {
          observer.next(token);
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.apiAuth.getNewAccessToken().pipe(
        tap((token) => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next(token);
        })
      );
    }
  }
}
