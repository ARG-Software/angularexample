import { UserModelUI } from "./../models/auth.models";
import { AuthActions, AuthActionTypes } from "../actions/auth.actions";

export interface AuthState {
  authorized: boolean;
  loggedUser: UserModelUI;
  loading: boolean;
  hasLoginError: boolean;
}

export const initialState: AuthState = {
  authorized: false,
  loggedUser: null,
  loading: false,
  hasLoginError: false,
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return { ...state, loading: true };
    }

    case AuthActionTypes.LoginFailure: {
      return { ...state, hasLoginError: true };
    }

    case AuthActionTypes.LoginSuccess: {
      const auth = {
        authorized: true,
        loggedUser: { ...action.payload },
        loading: false,
      };
      return { ...state, ...auth };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default:
      return state;
  }
}

export const getAuthState = (state: AuthState) => state;

export const getUserAuthorization = (state: AuthState) => state.authorized;

export const hasLoginError = (state: AuthState) => state.hasLoginError;

export const getLoading = (state: AuthState) => state.loading;

export const getLoggedUser = (state: AuthState) => state.loggedUser;
