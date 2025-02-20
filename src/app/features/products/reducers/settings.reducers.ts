import { SettingsActionTypes, SettingsActions } from '../actions/settings.actions';
import { KanbanDataModelUI, WipDataModelUI } from '../models/settings.models';

export interface SettingsState {
    wipData: WipDataModelUI[];
    kanBanData: KanbanDataModelUI[];
}

export const initialState: SettingsState = {
    wipData: [],
    kanBanData: []
};

export function reducer( state: SettingsState = initialState, action: SettingsActions ): SettingsState {

    switch (action.type) {

        case SettingsActionTypes.LoadDataSuccess: {
            return {
                ...state,
                wipData: action.payload.Wip,
                kanBanData: action.payload.Kanban
            };
        }

        // WIP
        case SettingsActionTypes.UpdateWip: {
            return {
                ...state, wipData: action.payload
            };
        }

        case SettingsActionTypes.UpdateWipSuccess: {
            return state;
        }

        // KanBan
        case SettingsActionTypes.UpdateKanBan: {
            return {
                ...state, kanBanData: action.payload
            };
        }

        case SettingsActionTypes.UpdateKanBanSuccess: {
            return state;
        }

        default:
            return state;
    }
}

export const getWipData = (state: SettingsState) => state.wipData;

export const getKanbanData = (state: SettingsState) => state.kanBanData;
