import { Injectable } from '@angular/core';
import { IMachineOperationsDto, IShiftGraphicDto } from '@api/models/apimodels';
import { IDownTimeRecordService } from '@api/services/interfaces/core/idowntimerecord.service';
import { IMachineOperationService } from '@api/services/interfaces/core/imachineoperation.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import * as loadingActions from '../../../main/actions/loading.actions';
import * as fromMain from '../../../main/main.reducers.index';
import { GetDownTimeChart, GetDownTimeChartSuccess, GetMachineOperationTable,
    GetMachineOperationTableSuccess, OverviewActionTypes, OverviewFailure } from '../actions/overview.actions';
import { DownTimeStatisticsChartRequestModel, MachineOperationsRequestModel } from '../models/overview.models';

@Injectable()
export class OverviewEffects {
    @Effect()
    public getDownTimeStatisticChart$ = this.actions$.pipe(
        ofType<GetDownTimeChart>(
            OverviewActionTypes.GetDownTimeChart
        ),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) => {
            const payload = action.payload;
            return payload;
        }),
        switchMap((payload: DownTimeStatisticsChartRequestModel) =>
            this.downTimeRecordService
            .getDowntimeOfProductShiftGraphic(payload.productId, payload.startDate)
            .pipe(
                map((graphicData: IShiftGraphicDto[]) => {
                    if (graphicData == null) {
                        return of(new OverviewFailure({}));
                    } else {
                        return new GetDownTimeChartSuccess(graphicData);
                    }
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new OverviewFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public getStatisticsChartDataSuccess$ = this.actions$.pipe(
        ofType<GetDownTimeChartSuccess>(
        OverviewActionTypes.GetDownTimeChartSuccess
        )
    );

    @Effect()
    public getMachineOperationTable$ = this.actions$.pipe(
        ofType<GetMachineOperationTable>(
            OverviewActionTypes.GetMachineOperationTable
        ),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) => {
            const payload = action.payload;
            return payload;
        }),
        switchMap((payload: MachineOperationsRequestModel) =>
            this.machineOperationService
            .GetMachineOperationsofProduct(payload.productId)
            .pipe(
                map((machinesData: IMachineOperationsDto[]) => {
                    if (machinesData == null) {
                        return new OverviewFailure({});
                    } else {
                        return new GetMachineOperationTableSuccess(machinesData);
                    }
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => of(new OverviewFailure(error)))
            )
        )
    );

    @Effect({ dispatch: false })
    public getMachineOperationTableSuccess$ = this.actions$.pipe(
        ofType<GetMachineOperationTableSuccess>(
            OverviewActionTypes.GetMachineOperationTableSuccess
        )
    );

    @Effect({ dispatch: false })
    public overviewFailure$ = this.actions$.pipe(
        ofType<OverviewFailure>(OverviewActionTypes.OverviewFailure),
        tap((error) => {
            console.log('error');
        })
    );

    public constructor(
        private actions$: Actions,
        private machineOperationService: IMachineOperationService,
        private downTimeRecordService: IDownTimeRecordService,
        private mainStore$: Store<fromMain.MainState>
    ) {}
}
