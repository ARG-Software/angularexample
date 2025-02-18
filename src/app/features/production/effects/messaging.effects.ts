import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/of';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';

import * as loadingActions from '../../../main/actions/loading.actions';
import * as fromMain from '../../../main/main.reducers.index';
import { IMessagingService } from '@api/services/interfaces/core/production/imessaging.service';
import {
  MessagingFailure,
  MessagingActionTypes,
  UpdateMessagingData,
  UpdateMessagingDataSuccess,
  GetMessagingData,
  GetMessagingDataSuccess,
} from '../actions/messaging.actions';
import {
  MessagingLoadDataModelUI,
  MessagingLoadDataModelUIFactory,
} from '../models/messaging.model';

import { apiRequest } from '../../../utils/funtion.utils';

@Injectable()
export class MessagingEffects {
  @Effect()
  public getMessagingData$ = this.actions$.pipe(
    ofType<GetMessagingData>(MessagingActionTypes.GetMessagingData),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    map((action) => {
      return action.payload;
    }),
    switchMap((payload) =>
      // this.messagingService.GetMessagingData(payload)
      apiRequest().pipe(
        map(
          (response: MessagingLoadDataModelUI[]) =>
            new GetMessagingDataSuccess(MessagingLoadDataModelUIFactory)
        ),
        finalize(() =>
          this.mainStore$.dispatch(new loadingActions.HideLoading())
        ),
        catchError((error) => {
          return of(new MessagingFailure(error));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  public getMessagingDataSuccess$ = this.actions$.pipe(
    ofType<GetMessagingDataSuccess>(
      MessagingActionTypes.GetMessagingDataSuccess
    )
  );

  @Effect()
  public updateMessaging$ = this.actions$.pipe(
    ofType<UpdateMessagingData>(MessagingActionTypes.UpdateMessagingData),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    map((action) => {
      return action.payload;
    }),
    switchMap((payload) =>
      // this.messagingService.UpdateMessagingData(payload)
      apiRequest().pipe(
        map((messaging: boolean) => {
          return new UpdateMessagingDataSuccess(true);
        }),
        finalize(() =>
          this.mainStore$.dispatch(new loadingActions.HideLoading())
        ),
        catchError((error) => {
          return of(new MessagingFailure(error));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  public updateMessagingSuccess$ = this.actions$.pipe(
    ofType<UpdateMessagingDataSuccess>(
      MessagingActionTypes.UpdateMessagingDataSuccess
    )
  );

  @Effect({ dispatch: false })
  public messagingFailure$ = this.actions$.pipe(
    ofType<MessagingFailure>(MessagingActionTypes.MessagingFailure),
    tap((error) => {
      console.log('error');
    })
  );

  public constructor(
    private actions$: Actions,
    private mainStore$: Store<fromMain.MainState>,
    private messagingService: IMessagingService
  ) {}
}
