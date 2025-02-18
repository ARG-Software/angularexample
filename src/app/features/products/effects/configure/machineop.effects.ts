import { Injectable } from '@angular/core';
import * as loadingActions from '../../../../main/actions/loading.actions';
import * as fromMain from '../../../../main/main.reducers.index';
import * as fromModule from '../../products.reducers.index';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  ConfigureActions,
  ConfigurationActionTypes,
  GetMachineOperationSuccess,
  AddMachineOperationSuccess,
  RemoveMachineOperationSuccess,
  ErrorConfiguration,
} from '../../actions/configure.actions';
import {
  tap,
  withLatestFrom,
  filter,
  switchMap,
  map,
  catchError,
  finalize,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IMachineOperationService } from '@api/services/interfaces/core/imachineoperation.service';
import { IMachineOperationsDto } from '@api/models/apimodels';
import { mapObjectTypeToRequested } from '../../../../utils/funtion.utils';
import { of } from 'rxjs/of';
import { MachineOperationModelUI } from '../../models/configure.model';

@Injectable()
export class ConfigureMachinesOperationEffects {
  @Effect() public getMachineOperations$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.GetMachineOperations),
    withLatestFrom(
      this.moduleStore$.pipe(select(fromModule.getMachineOperationsUpdateState))
    ),
    filter(([_, updateNeeded]) => updateNeeded),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(([action, _]) =>
      this.machineOperationService
        .GetMachineOperationsofProduct(action.payload)
        .pipe(
          map((machineOperationList: IMachineOperationsDto[]) => {
            const machineOperationListCasted =
              mapObjectTypeToRequested<MachineOperationModelUI[]>(
                machineOperationList
              );
            return new GetMachineOperationSuccess(machineOperationListCasted);
          }),
          catchError((error) => {
            return of(new ErrorConfiguration(error));
          }),
          finalize(() =>
            this.mainStore$.dispatch(new loadingActions.HideLoading())
          )
        )
    )
  );

  @Effect() public addMachineOperation$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.AddMachineOperation),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap((action) =>
      this.machineOperationService.AddMachineOperation(action.payload).pipe(
        map((addedMachineOperation: IMachineOperationsDto) => {
          const machineOperationCasted =
            mapObjectTypeToRequested<MachineOperationModelUI>(
              addedMachineOperation
            );
          return new AddMachineOperationSuccess(machineOperationCasted);
        }),
        catchError((error) => {
          return of(new ErrorConfiguration(error));
        }),
        finalize(() =>
          this.mainStore$.dispatch(new loadingActions.HideLoading())
        )
      )
    )
  );

  @Effect() public removeMachineOperation$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.RemoveMachineOperation),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap((action) =>
      this.machineOperationService.DeleteMachineOperation(action.payload).pipe(
        map((hasBeenDeleted: boolean) => {
          if (hasBeenDeleted) {
            return new RemoveMachineOperationSuccess(action.payload);
          }
          return new ErrorConfiguration({});
        }),
        catchError((error) => {
          return of(new ErrorConfiguration(error));
        }),
        finalize(() =>
          this.mainStore$.dispatch(new loadingActions.HideLoading())
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private moduleStore$: Store<fromModule.ProductState>,
    private machineOperationService: IMachineOperationService,
    private mainStore$: Store<fromMain.MainState>
  ) {}
}
