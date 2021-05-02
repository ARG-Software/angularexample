import * as Actions from '../actions/loading.actions';

export interface LayoutState {
    loading: boolean;
}

const initialState: LayoutState = {
    loading: false
};

export function LayoutReducer(state = initialState, action: Actions.LoadingAction): LayoutState {

    switch (action.type) {

        case Actions.ActionTypes.SHOW_LOADING: {
            return {
                ...state,
                loading: true
            };
        }

        case Actions.ActionTypes.HIDE_LOADING: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}

export const getLayoutState = (state: LayoutState) => state;

export const getLoading = (state: LayoutState) => state.loading;
