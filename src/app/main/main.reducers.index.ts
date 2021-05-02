import { ActionReducerMap } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromLayout from './reducers/layout.reducer';

export const reducerName = 'mains';

// tslint:disable-next-line:no-empty-interface
export interface MainState {
    layout: fromLayout.LayoutState;
}

export const reducersDefinition: ActionReducerMap<MainState> = {
    layout: fromLayout.LayoutReducer
};

export const mainReducers = reducersDefinition;

const getModuleState = createFeatureSelector<MainState>(reducerName);

// Loading

const getLoadingState = createSelector(getModuleState, (state: MainState) => state.layout);

export const getLoading = createSelector(getLoadingState, fromLayout.getLoading);
