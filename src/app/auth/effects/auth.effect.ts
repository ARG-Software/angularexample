import { APP_CONFIG } from './../../app.config';
import { UserModelUI } from './../models/auth.models';
import { Injectable, Injector } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import * as MimsModels from '@api/models/apimodels';

import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
} from './../actions/auth.actions';

import { IAuthorizationService } from '@api/services/interfaces/core/iauthorization.service';
import { LoginModelUI } from '../models/auth.models';
import { IAppConfig } from '../../app.config';

@Injectable()
export class AuthEffects {
  @Effect()
  public loginUser$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map((action) => {
      const actionPayload: LoginModelUI = action.payload;
      const loginDto: MimsModels.ILoginDto = {
        UserName: actionPayload.username,
        Password: actionPayload.password,
      };
      return loginDto;
    }),
    switchMap((payload: MimsModels.ILoginDto) =>
      this.auth.login(payload).pipe(
        map((user: MimsModels.ILoginSession) => {
          if (user == null) {
            return new LoginFailure({});
          } else {
            localStorage.setItem(this.accessTokenKey, user.AccessToken);
            localStorage.setItem(this.refreshTokenKey, user.RefreshToken);
            const newActionPayload: UserModelUI = {
              Id: user.User.Id,
              Name: user.User.Name,
              Email: user.User.Email,
              Login: user.User.Login,
            };
            return new LoginSuccess(newActionPayload);
          }
        }),
        catchError((error) => {
          console.log(error);
          return Observable.of(new LoginFailure({}));
        })
      )
    )
  );
  @Effect({ dispatch: false })
  public loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action) => (action as any).payload),
    map((user: UserModelUI) => {
      this.router.navigate(['main']);
    })
  );
  @Effect({ dispatch: false })
  public loginFailure$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginFailure),
    tap((user) => {
      console.log('failed login');
    })
  );
  @Effect({ dispatch: false })
  public logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => {
      localStorage.removeItem(this.accessTokenKey);
      localStorage.removeItem(this.refreshTokenKey);
      this.router.navigate([this.appConfigurations.loginAppPath]);
    })
  );

  private readonly appConfigurations: IAppConfig;
  private accessTokenKey: string;
  private refreshTokenKey: string;
  constructor(
    private actions$: Actions,
    private auth: IAuthorizationService,
    private router: Router,
    private readonly injector: Injector
  ) {
    this.appConfigurations = this.injector.get(APP_CONFIG);
    this.accessTokenKey = this.appConfigurations.accessTokenKey;
    this.refreshTokenKey = this.appConfigurations.refreshTokenKey;
  }
}
