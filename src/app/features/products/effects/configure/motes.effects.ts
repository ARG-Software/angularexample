import { Injectable } from '@angular/core';
import * as loadingActions from '../../../../main/actions/loading.actions';
import * as fromMain from '../../../../main/main.reducers.index';
import * as fromModule from '../../products.reducers.index';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  ConfigureActions,
  ConfigurationActionTypes,
  GetMotesSuccess,
  AddMoteSuccess,
  RemoveMoteSuccess,
  ErrorConfiguration,
  GetMotesSelectBoxSuccess,
} from '../../actions/configure.actions';
import {
  tap,
  withLatestFrom,
  filter,
  switchMap,
  map,
  concatMap,
  catchError,
  finalize,
} from 'rxjs/operators';
import {
  MoteModelUI,
  ConfigureSelectBoxModelUI,
} from '../../models/configure.model';
import { Store, select } from '@ngrx/store';
import { IMoteService } from '@api/services/interfaces/core/imote.service';
import { IMoteDto } from '@api/models/apimodels';
import { mapObjectTypeToRequested } from '../../../../utils/funtion.utils';
import { of } from 'rxjs/of';

@Injectable()
export class ConfigureMotesEffects {
  @Effect() public getMotes$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.GetMotes),
    withLatestFrom(
      this.moduleStore$.pipe(select(fromModule.getMotesUpdateState))
    ),
    filter(([_, updateNeeded]) => updateNeeded),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(([action, _]) =>
      this.moteService.GetMotesofProduct(action.payload).pipe(
        map((moteList: IMoteDto[]) => {
          const moteListCasted =
            mapObjectTypeToRequested<MoteModelUI[]>(moteList);
          const motesSelectBox = moteListCasted.map((element) => {
            const newElement: ConfigureSelectBoxModelUI = {
              name: element.Name,
              selected: false,
              value: element.Id,
            };
            return newElement;
          });
          const actionsArray = [
            new GetMotesSuccess(moteListCasted),
            new GetMotesSelectBoxSuccess(motesSelectBox),
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

  @Effect() public addMote$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.AddMote),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    map((action) => {
      return mapObjectTypeToRequested<IMoteDto>(action.payload);
    }),
    switchMap((payload) =>
      this.moteService.AddMote(payload).pipe(
        map((addedMote: IMoteDto) => {
          const moteCasted = mapObjectTypeToRequested<MoteModelUI>(addedMote);
          return new AddMoteSuccess(moteCasted);
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

  @Effect() public removeMote$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.RemoveMote),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap((action) =>
      this.moteService.DeleteMote(action.payload).pipe(
        map((hasBeenDeleted: boolean) => {
          if (hasBeenDeleted) {
            return new RemoveMoteSuccess(action.payload);
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
    private moteService: IMoteService,
    private moduleStore$: Store<fromModule.ProductState>,
    private mainStore$: Store<fromMain.MainState>
  ) {}
}
