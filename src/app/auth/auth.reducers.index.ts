import * as fromAuthReducerDefinition from "./reducers/auth.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const reducerName = "auth";

export const reducers = fromAuthReducerDefinition.reducer;

const selectAuthState =
  createFeatureSelector<fromAuthReducerDefinition.AuthState>(reducerName);

const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: fromAuthReducerDefinition.AuthState) => state
);

export const getUserAuthorization = createSelector(
  selectAuthStatusState,
  fromAuthReducerDefinition.getUserAuthorization
);

export const hasLoginError = createSelector(
  selectAuthStatusState,
  fromAuthReducerDefinition.hasLoginError
);

export const getLoading = createSelector(
  selectAuthStatusState,
  fromAuthReducerDefinition.getLoading
);

export const getLoggedUser = createSelector(
  selectAuthStatusState,
  fromAuthReducerDefinition.getLoggedUser
);
