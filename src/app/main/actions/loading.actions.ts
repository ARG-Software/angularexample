import { Action } from '@ngrx/store';

export enum ActionTypes {
    SHOW_LOADING = '[Loading] Show Loading',
    HIDE_LOADING = '[Loading] Hide Loading',
}

export class ShowLoading implements Action {
    public type = ActionTypes.SHOW_LOADING;
    constructor(public payload?: any) {
    }
}

export class HideLoading implements Action {
    public type = ActionTypes.HIDE_LOADING;
    constructor(public payload?: any) {
    }
}

export type LoadingAction = ShowLoading | HideLoading;
