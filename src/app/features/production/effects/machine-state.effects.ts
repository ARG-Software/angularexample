import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { apiRequest } from '../../../utils/funtion.utils';

import * as loadingActions from '../../../main/actions/loading.actions';
import * as fromMain from '../../../main/main.reducers.index';

import { IMachineStateService } from '@api/services/interfaces/core/production/imachine-state.service';
import {
    MachineFailure,
    MachineStateActionTypes,
    GetMachineData,
    GetMachineDataSuccess,
    UpdateMachineData,
    UpdateMachineDataSuccess
} from '../actions/machine-state.actions';

import {
    MachineStateSaveDataModelUI,
    MachineStateLoadDataModelUIFactory,
    MachineStateDataRequestModelUI
} from '../models/machine-state.model';

@Injectable()
export class MachineStateEffects {

    @Effect()
    public getMachineStateData$ = this.actions$.pipe(
        ofType<GetMachineData>(MachineStateActionTypes.GetMachineData),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) => {
            return action.payload;
        }),
        switchMap((payload: MachineStateDataRequestModelUI) =>
            // this.machineStateService.GetMachineStateData(payload)
            apiRequest()
            .pipe(
                map((response: any[]) => new GetMachineDataSuccess(MachineStateLoadDataModelUIFactory)),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new MachineFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public getMachineStateDataSuccess$ = this.actions$.pipe(
        ofType<GetMachineDataSuccess>(MachineStateActionTypes.GetMachineDataSuccess)
    );

    @Effect()
    public updateMachineState$ = this.actions$.pipe(
        ofType<UpdateMachineData>(MachineStateActionTypes.UpdateMachineData),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) =>
            action.payload
        ),
        switchMap((payload: MachineStateSaveDataModelUI) =>
            // this.machineStateService.UpdateMachineStateData(payload)
            apiRequest()
            .pipe(
                map((machine: boolean) => new UpdateMachineDataSuccess(true)),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new MachineFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public updateMachineStateSuccess$ = this.actions$.pipe(
        ofType<UpdateMachineDataSuccess>(MachineStateActionTypes.UpdateMachineDataSuccess)
    );

    @Effect({ dispatch: false})
    public machineStateFailure$ = this.actions$.pipe(
        ofType<MachineFailure>(MachineStateActionTypes.MachineFailure),
        tap((error) => {
            console.log('error');
        })
    );

    public constructor(
        private actions$: Actions,
        private mainStore$: Store<fromMain.MainState>,
        private machineStateService: IMachineStateService
    ) {}
}
