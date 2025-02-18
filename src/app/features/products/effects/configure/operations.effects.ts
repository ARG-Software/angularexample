import { Injectable } from '@angular/core';
import * as loadingActions from '../../../../main/actions/loading.actions';
import * as fromMain from '../../../../main/main.reducers.index';
import * as fromModule from '../../products.reducers.index';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  ConfigureActions,
  ConfigurationActionTypes,
  GetOperationsSuccess,
  AddOpertionSuccess,
  RemoveOperationSuccess,
  ErrorConfiguration,
  GetOperationsSelectBoxSuccess,
} from '../../actions/configure.actions';
import {
  tap,
  switchMap,
  map,
  finalize,
  catchError,
  filter,
  withLatestFrom,
  concatMap,
} from 'rxjs/operators';
import {
  OperationModelUI,
  ConfigureSelectBoxModelUI,
} from '../../models/configure.model';
import { Store, select } from '@ngrx/store';
import { IOperationService } from '@api/services/interfaces/core/ioperation.service';
import { IOperationDto } from '@api/models/apimodels';
import { mapObjectTypeToRequested } from '../../../../utils/funtion.utils';
import { of } from 'rxjs/of';

@Injectable()
export class ConfigureOperationsEffects {
  @Effect() public getOperations$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.GetOperations),
    withLatestFrom(
      this.moduleStore$.pipe(select(fromModule.getOperationsUpdateState))
    ),
    filter(([_, updateNeeded]) => updateNeeded),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(([action, _]) =>
      this.operationService.GetOperationsByProductId(action.payload).pipe(
        map((operationList: IOperationDto[]) => {
          const operationListCasted =
            mapObjectTypeToRequested<OperationModelUI[]>(operationList);
          const operationsSelectBox = operationListCasted.map((element) => {
            const newElement: ConfigureSelectBoxModelUI = {
              name: element.Description,
              selected: false,
              value: element.Id,
            };
            return newElement;
          });
          const actionsArray = [
            new GetOperationsSuccess(operationListCasted),
            new GetOperationsSelectBoxSuccess(operationsSelectBox),
          ];
          return actionsArray;
        }),
        concatMap((actions) => {
          return actions;
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

  @Effect() public addOperation$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.AddOperation),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    map((action) => {
      return mapObjectTypeToRequested<IOperationDto>(action.payload);
    }),
    switchMap((payload) =>
      this.operationService.AddOperation(payload).pipe(
        map((addedOperation: IOperationDto) => {
          const operationCasted =
            mapObjectTypeToRequested<OperationModelUI>(addedOperation);
          return new AddOpertionSuccess(operationCasted);
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

  @Effect() public removeOperation$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.RemoveOperation),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap((action) =>
      this.operationService.DeleteOperation(action.payload).pipe(
        map((hasBeenDeleted: boolean) => {
          if (hasBeenDeleted) {
            return new RemoveOperationSuccess(action.payload);
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
    private mainStore$: Store<fromMain.MainState>,
    private operationService: IOperationService
  ) {}
}
