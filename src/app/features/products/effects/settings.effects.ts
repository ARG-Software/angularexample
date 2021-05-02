import { Injectable } from '@angular/core';
import { ISettingsService } from '@api/services/interfaces/core/isettings.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import * as loadingActions from '../../../main/actions/loading.actions';
import * as fromMain from '../../../main/main.reducers.index';
import { LoadData, LoadDataSuccess, SettingsActionTypes,
    SettingsFailure, UpdateKanBan,
    UpdateKanBanSuccess, UpdateWip, UpdateWipSuccess } from '../actions/settings.actions';
import { KanbanDataModelUI, WipDataModelUI } from '../models/settings.models';
import * as MimsModels from '@api/models/apimodels';

@Injectable()
export class SettingsEffects {

    @Effect()
    public getData$ = this.actions$.pipe(
        ofType<LoadData>(SettingsActionTypes.LoadData),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) => {
            return action.payload;
        }),
        switchMap((payload) =>
            this.settingsService.GetBuffersForProduct(payload)
            .pipe(
                map((response: MimsModels.IBufferDto[]) => new LoadDataSuccess(convertDataInWipUIAndKanBanUIModels(response))),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new SettingsFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public getDataSuccess$ = this.actions$.pipe(
        ofType<LoadDataSuccess>(SettingsActionTypes.LoadDataSuccess)
    );

    @Effect()
    public updateWipData$ = this.actions$.pipe(
        ofType<UpdateWip>( SettingsActionTypes.UpdateWip ),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) =>
            action.payload
        ),
        switchMap((payload: WipDataModelUI[]) =>
            this.settingsService.UpdateWip(payload)
            .pipe(
                map((wipData: boolean) => {
                    return new UpdateWipSuccess(wipData);
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new SettingsFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public updateWipDataSuccess$ = this.actions$.pipe(
        ofType<UpdateWipSuccess>(
            SettingsActionTypes.UpdateWipSuccess
        )
    );

    @Effect()
    public updateKanbanData$ = this.actions$.pipe(
        ofType<UpdateKanBan>( SettingsActionTypes.UpdateKanBan ),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) =>
            action.payload
        ),
        switchMap((payload: KanbanDataModelUI[]) =>
            this.settingsService.UpdateKanBan(payload)
            .pipe(
                map((kanbanData: boolean) => {
                    return new UpdateKanBanSuccess(kanbanData);
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new SettingsFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public updateKanbanDataSuccess$ = this.actions$.pipe(
        ofType<UpdateWipSuccess>(
            SettingsActionTypes.UpdateWipSuccess
        )
    );

    @Effect({ dispatch: false })
    public settingsFailure$ = this.actions$.pipe(
        ofType<SettingsFailure>(SettingsActionTypes.SettingsFailure),
        tap((error) => {
            console.log('error');
        })
    );

    public constructor(
        private actions$: Actions,
        private settingsService: ISettingsService,
        private mainStore$: Store<fromMain.MainState>
    ) {}
}

/**
 * Divide the data in two ui models
 * @param data data to be divided
 */
export function convertDataInWipUIAndKanBanUIModels(data: MimsModels.IBufferDto[]): any {

    const processedData = {
        Wip: [] as WipDataModelUI[],
        Kanban: [] as KanbanDataModelUI[]
    };

    data.forEach((elem) => {
        processedData.Wip.push({
            Name: elem.Name,
            Count: elem.Count,
            Id: elem.Id,
            ProductId: elem.ProductId,
            LowAlertLowWarning: elem.LowAlertLowWarning,
            LowWarningTarget: elem.LowWarningTarget,
            TargetHighWarning: elem.TargetHighWarning,
            HighWarningHighAlert: elem.HighWarningHighAlert,
            NextOperationId: elem.NextOperationId,
            PreviousOperationId: elem.PreviousOperationId
        });
        processedData.Kanban.push({
            Name: elem.Name,
            Id: elem.Id,
            ProductId: elem.ProductId,
            Count: elem.Count,
            LowAlertLowWarning: elem.LowAlertLowWarning,
            LowWarningTarget: elem.LowWarningTarget,
            TargetHighWarning: elem.TargetHighWarning,
            HighWarningHighAlert: elem.HighWarningHighAlert,
            NextOperationId: elem.NextOperationId,
            PreviousOperationId: elem.PreviousOperationId
        });
    });

    return processedData;
}
