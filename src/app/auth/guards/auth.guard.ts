import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModule from '../auth.reducers.index';
import { Logout } from '../actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<fromModule.AuthState>) {}

  /**
   * Validate if can activate route.
   */
  public canActivate(): Observable<boolean> {
    return this.userIsAuthorizedToNavigate();
  }

  /**
   * Validate if can activate child route.
   * @param childRoute
   * @param state
   */
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userIsAuthorizedToNavigate();
  }

  private userIsAuthorizedToNavigate(): Observable<any> {
    return this.userIsAuthorized()
      .switchMap((authorized) => {
        if (authorized === false) {
          this.logout();
        }
        return Observable.of(authorized);
      })
      .catch(() => {
        this.logout();
        return Observable.of(false);
      });
  }

  private userIsAuthorized(): Observable<any> {
    return this.store.select(fromModule.getUserAuthorization).take(1);
  }

  /**
   * Logout
   */
  private logout(): void {
    this.store.dispatch(new Logout({}));
  }
}
