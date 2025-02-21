import { Injectable } from "@angular/core";
import * as loadingActions from "../../../../main/actions/loading.actions";
import * as fromMain from "../../../../main/main.reducers.index";
import * as fromModule from "../../products.reducers.index";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import {
  GetSensors,
  AddSensor,
  RemoveSensor,
  GetSensorsSuccess,
  AddSensorSuccess,
  RemoveSensorSuccess,
  ErrorConfiguration,
  ConfigurationActionTypes,
} from "../../actions/configure.actions";
import {
  tap,
  withLatestFrom,
  filter,
  switchMap,
  map,
  catchError,
  finalize,
} from "rxjs/operators";
import { SensorModelUI } from "../../models/configure.model";
import { IElectricalConcactService } from "@api/services/interfaces/core/ielectricalcontact.service";
import { IElectricalContactDto } from "@api/models/apimodels";
import { of } from "rxjs";
import { mapObjectTypeToRequested } from "../../../../utils/funtion.utils";

@Injectable()
export class ConfigureSensorsEffects {
  constructor(
    private actions$: Actions,
    private moduleStore$: Store<fromModule.ProductState>,
    private mainStore$: Store<fromMain.MainState>,
    private sensorService: IElectricalConcactService
  ) {}

  public getSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetSensors>(ConfigurationActionTypes.GetSensors),
      withLatestFrom(
        this.moduleStore$.pipe(select(fromModule.getSensorUpdateState))
      ),
      filter(([_, updateNeeded]) => updateNeeded),
      tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
      switchMap(([action]) =>
        this.sensorService.GetECofProduct(action.payload).pipe(
          map((sensorList: IElectricalContactDto[]) => {
            const sensorListCasted =
              mapObjectTypeToRequested<SensorModelUI[]>(sensorList);
            return new GetSensorsSuccess(sensorListCasted);
          }),
          catchError((error) => of(new ErrorConfiguration(error))),
          finalize(() =>
            this.mainStore$.dispatch(new loadingActions.HideLoading())
          )
        )
      )
    )
  );

  public addSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AddSensor>(ConfigurationActionTypes.AddSensor),
      tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
      switchMap((action) =>
        this.sensorService.AddEC(action.payload as any).pipe(
          map((addedSensor: IElectricalContactDto) => {
            const sensorCasted =
              mapObjectTypeToRequested<SensorModelUI>(addedSensor);
            return new AddSensorSuccess(sensorCasted);
          }),
          catchError((error) => of(new ErrorConfiguration(error))),
          finalize(() =>
            this.mainStore$.dispatch(new loadingActions.HideLoading())
          )
        )
      )
    )
  );

  public removeSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RemoveSensor>(ConfigurationActionTypes.RemoveSensor),
      tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
      switchMap((action) =>
        this.sensorService.DeleteEC(action.payload).pipe(
          map((hasBeenDeleted: boolean) =>
            hasBeenDeleted
              ? new RemoveSensorSuccess(action.payload)
              : new ErrorConfiguration({})
          ),
          catchError((error) => of(new ErrorConfiguration(error))),
          finalize(() =>
            this.mainStore$.dispatch(new loadingActions.HideLoading())
          )
        )
      )
    )
  );
}
