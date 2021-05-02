import { LoginModelUI, UserModelUI } from './../models/auth.models';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
}

export class Login implements Action {
    public type = AuthActionTypes.Login;
    constructor(public payload: LoginModelUI) { }
}

export class LoginSuccess implements Action {
    public type = AuthActionTypes.LoginSuccess;
    constructor(public payload: UserModelUI) { }
}

export class LoginFailure implements Action {
    public type = AuthActionTypes.LoginFailure;
    constructor(public payload: any) { }
}

export class Logout implements Action {
    public type = AuthActionTypes.Logout;
    constructor(public payload: any) {
    }
}

export type AuthActions
    = Login
    | LoginSuccess
    | LoginFailure
    | Logout;
