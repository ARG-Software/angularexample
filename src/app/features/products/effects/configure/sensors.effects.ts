import { Injectable } from '@angular/core';
import * as loadingActions from '../../../../main/actions/loading.actions';
import * as fromMain from '../../../../main/main.reducers.index';
import * as fromModule from '../../products.reducers.index';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { ConfigureActions, ConfigurationActionTypes, GetSensorsSuccess,
    AddSensorSuccess, RemoveSensorSuccess, ErrorConfiguration } from '../../actions/configure.actions';
import { tap, withLatestFrom, filter, switchMap, map, catchError, finalize } from 'rxjs/operators';
import { SensorModelUI } from '../../models/configure.model';
import { Store, select } from '@ngrx/store';
import { IElectricalConcactService } from '@api/services/interfaces/core/ielectricalcontact.service';
import { IElectricalContactDto } from '@api/models/apimodels';
import { of } from 'rxjs/observable/of';
import { mapObjectTypeToRequested } from '../../../../utils/funtion.utils';

@Injectable()
export class ConfigureSensorsEffects {
    @Effect() public getSensors$ = this.actions$
    .pipe(
         ofType<ConfigureActions>(ConfigurationActionTypes.GetSensors),
         withLatestFrom(this.moduleStore$.pipe(select(fromModule.getSensorUpdateState))),
         filter(([_, updateNeeded]) => updateNeeded ),
         tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
         switchMap(([action, _]) =>
                    this.sensorService.GetECofProduct(action.payload)
                        .pipe(
                            map((sensorList: IElectricalContactDto[]) => {
                                const sensorListCasted = mapObjectTypeToRequested<SensorModelUI[]>(sensorList);
                                return new GetSensorsSuccess(sensorListCasted);
                            }),
                            catchError((error) => {
                                return of(new ErrorConfiguration(error));
                            }),
                            finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading()))
                        ))
            );

    @Effect() public addSensor$ = this.actions$
    .pipe(
        ofType<ConfigureActions>(ConfigurationActionTypes.AddSensor),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        switchMap((action) =>
        this.sensorService.AddEC(action.payload)
            .pipe(
                map((addedSensor: IElectricalContactDto) => {
                    const sensorCasted = mapObjectTypeToRequested<SensorModelUI>(addedSensor);
                    return new AddSensorSuccess(sensorCasted);
                }),
                catchError((error) => {
                    return of(new ErrorConfiguration(error));
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading()))
            ))
    );

    @Effect() public removeSensor$ = this.actions$
    .pipe(
        ofType<ConfigureActions>(ConfigurationActionTypes.RemoveSensor),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        switchMap((action) =>
        this.sensorService.DeleteEC(action.payload)
            .pipe(
                map((hasBeenDeleted: boolean) => {
                    if (hasBeenDeleted) {
                        return new RemoveSensorSuccess(action.payload);
                    }
                    return new ErrorConfiguration({});
                }),
                catchError((error) => {
                    return of(new ErrorConfiguration(error));
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading()))
            ))
   );

    constructor(
        private actions$: Actions,
        private moduleStore$: Store<fromModule.ProductState>,
        private sensorService: IElectricalConcactService,
        private mainStore$: Store<fromMain.MainState>,
    ) {}
}
