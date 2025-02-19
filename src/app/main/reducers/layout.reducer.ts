import { Action } from "@ngrx/store";
import * as Actions from "../actions/loading.actions";

export interface LayoutState {
  loading: boolean;
}

const initialState: LayoutState = {
  loading: false,
};

export function LayoutReducer(
  state: LayoutState = initialState,
  action: Actions.LoadingAction | Action
): LayoutState {
  switch (action.type) {
    case Actions.ActionTypes.SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };

    case Actions.ActionTypes.HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

// Selectors
export const getLayoutState = (state: LayoutState) => state;
export const getLoading = (state: LayoutState) => state.loading;
