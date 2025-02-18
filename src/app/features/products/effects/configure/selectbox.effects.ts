import { Injectable } from '@angular/core';
import * as loadingActions from '../../../../main/actions/loading.actions';
import * as fromMain from '../../../../main/main.reducers.index';
import * as fromModule from '../../products.reducers.index';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  ConfigureActions,
  ConfigurationActionTypes,
  GetEdgesSelectBoxSuccess,
  GetMessagesSelectBoxSuccess,
  GetSubcontractorsSelectBoxSuccess,
  GetMachineSelectBoxSuccess,
  ErrorConfiguration,
} from '../../actions/configure.actions';
import {
  tap,
  withLatestFrom,
  filter,
  switchMap,
  map,
  finalize,
  catchError,
} from 'rxjs/operators';
import {
  MachineModelUI,
  ConfigureSelectBoxModelUI,
  SubcontractorModelUI,
  EdgeModelUI,
  MessageModelUI,
} from '../../models/configure.model';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/of';
import { IMachineService } from '@api/services/interfaces/core/imachine.service';
import {
  IMachineDto,
  ISubcontractorsDto,
  IEdgeDto,
  IContactMessageDto,
} from '@api/models/apimodels';
import { mapObjectTypeToRequested } from '../../../../utils/funtion.utils';
import { ISubcontractorService } from '@api/services/interfaces/core/isubcontractor.service';
import { IEdgeService } from '@api/services/interfaces/core/iedge.service';
import { IContactMessageService } from '@api/services/interfaces/core/icontactmessage.service';

@Injectable()
export class ConfigureSelectBoxEffects {
  @Effect() public getEdgesSelectBox$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.GetEdgesSelectBox),
    withLatestFrom(this.moduleStore$.pipe(select(fromModule.getEdgeSelectBox))),
    filter(([_, edgesSelectBox]) => edgesSelectBox.length === 0),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(([__, _]) =>
      this.edgeService.GetEdges().pipe(
        map((edgeList: IEdgeDto[]) => {
          const edgeListCasted =
            mapObjectTypeToRequested<EdgeModelUI[]>(edgeList);
          const edgeSelectBox = edgeListCasted.map((element) => {
            const newElement: ConfigureSelectBoxModelUI = {
              name: element.Model,
              selected: false,
              value: element.Id,
            };
            return newElement;
          });
          return new GetEdgesSelectBoxSuccess(edgeSelectBox);
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
  @Effect() public getMessagesSelectBox$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.GetMessagesSelectBox),
    withLatestFrom(
      this.moduleStore$.pipe(select(fromModule.getMessagesSelectBox))
    ),
    filter(([_, messagesSelectBox]) => messagesSelectBox.length === 0),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(([__, _]) =>
      this.messagesService.GetContactMessages().pipe(
        map((messageList: IContactMessageDto[]) => {
          const messageListCasted =
            mapObjectTypeToRequested<MessageModelUI[]>(messageList);
          const messageSelectBox = messageListCasted.map((element) => {
            const newElement: ConfigureSelectBoxModelUI = {
              name: element.Name,
              selected: false,
              value: element.Id,
            };
            return newElement;
          });
          return new GetMessagesSelectBoxSuccess(messageSelectBox);
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

  @Effect() public getSubContractorsSelectBox$ = this.actions$.pipe(
    ofType<ConfigureActions>(
      ConfigurationActionTypes.GetSubcontractorsSelectBox
    ),
    withLatestFrom(
      this.moduleStore$.pipe(select(fromModule.getSubContractorsSelectBox))
    ),
    filter(
      ([_, subcontractorsSelectBox]) => subcontractorsSelectBox.length === 0
    ),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(([__, _]) =>
      this.subcontractorService.GetSubcontractors().pipe(
        map((machineList: ISubcontractorsDto[]) => {
          const subcontractorsListCasted =
            mapObjectTypeToRequested<SubcontractorModelUI[]>(machineList);
          const subcontractorsSelectBox = subcontractorsListCasted.map(
            (element) => {
              const newElement: ConfigureSelectBoxModelUI = {
                name: element.Name,
                selected: false,
                value: element.Id,
              };
              return newElement;
            }
          );
          return new GetSubcontractorsSelectBoxSuccess(subcontractorsSelectBox);
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

  @Effect() public getMachinesSelectBox$ = this.actions$.pipe(
    ofType<ConfigureActions>(ConfigurationActionTypes.GetMachineSelectBox),
    withLatestFrom(
      this.moduleStore$.pipe(select(fromModule.getMachineSelectBox))
    ),
    filter(([_, machinesSelectBox]) => machinesSelectBox.length === 0),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(([__, _]) =>
      this.machineService.GetMachines().pipe(
        map((machineList: IMachineDto[]) => {
          const machineListCasted =
            mapObjectTypeToRequested<MachineModelUI[]>(machineList);
          const machineSelectBox = machineListCasted.map((element) => {
            const newElement: ConfigureSelectBoxModelUI = {
              name: element.Name,
              selected: false,
              value: element.Id,
            };
            return newElement;
          });
          return new GetMachineSelectBoxSuccess(machineSelectBox);
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
    private machineService: IMachineService,
    private subcontractorService: ISubcontractorService,
    private edgeService: IEdgeService,
    private messagesService: IContactMessageService
  ) {}
}
