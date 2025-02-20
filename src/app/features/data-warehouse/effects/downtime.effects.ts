import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { catchError, switchMap, map, tap, finalize } from "rxjs/operators";

import { of } from "rxjs/observable/of";

import * as MimsModels from "@api/models/apimodels";

import * as fromMain from "../../../main/main.reducers.index";
import * as loadingActions from "../../../main/actions/loading.actions";

import {
  GetDowntimeData,
  GetDowntimeDataSuccess,
  DowntimeFailure,
  DowntimeActionTypes,
  GetDowntimeDataSelectBoxes,
  GetDowntimeDataSelectBoxesSuccess,
} from "../actions/downtime.actions";

import * as DowntimeModelsUI from "../models/downtime.models";

import { IDownTimeMachiningService } from "@api/services/interfaces/core/data-warehouse/idowntime.service";
import { IMachineService } from "@api/services/interfaces/core/imachine.service";
import { IProductService } from "@api/services/interfaces/core/iproduct.service";
import { forkJoin } from "rxjs/observable/forkJoin";

import { MimsSelectBoxModel } from "@mimsUI/input/select-box/models/select-box.model";
import { DWMachiningDowntimeScreenRequestDto } from "@api/models/apimodels";

@Injectable()
export class DowntimeEffects {
  @Effect()
  public getDowntimeData$ = this.actions$.pipe(
    ofType<GetDowntimeData>(DowntimeActionTypes.GetDowntimeData),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    map((action) => {
      const request: DWMachiningDowntimeScreenRequestDto = {
        DWMachiningFilterDto: {
          StartDate: new Date(action.payload.Filters.StartDate),
          EndDate: new Date(action.payload.Filters.EndDate),
          MachineId: action.payload.Filters.MachineId,
          ProductId: action.payload.Filters.ProductId,
        },
        Paging: action.payload.Paging,
      };

      return request;
    }),
    switchMap((payload) =>
      this.downtimeService.GetDownTimeData(payload).pipe(
        map((response: MimsModels.IMachineDowntimeScreenDto) => {
          const downtimeData: DowntimeModelsUI.DowntimeDataModelUI = {
            Chart: converApiDataToChartData(response.ChartData),
            Table: convertApiDataToTableData(response.TableData),
          };

          return new GetDowntimeDataSuccess(downtimeData);
        }),
        finalize(() =>
          this.mainStore$.dispatch(new loadingActions.HideLoading())
        ),
        catchError((error) => {
          return of(new DowntimeFailure(error));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  public getDowntimeDataSuccess$ = this.actions$.pipe(
    ofType<GetDowntimeDataSuccess>(DowntimeActionTypes.GetDowntimeDataSuccess)
  );

  @Effect()
  public getDowntimeDataSelectBox$ = this.actions$.pipe(
    ofType<GetDowntimeDataSelectBoxes>(
      DowntimeActionTypes.GetDowntimeDataSelectBoxes
    ),
    tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
    switchMap(() =>
      forkJoin(
        this.machineService.GetMachines(),
        this.productService.GetProductsList()
      ).pipe(
        map((response: any[]) => {
          return new GetDowntimeDataSelectBoxesSuccess(
            convertApiDataToSelectBoxes(response)
          );
        }),
        finalize(() =>
          this.mainStore$.dispatch(new loadingActions.HideLoading())
        ),
        catchError((error) => {
          return of(new DowntimeFailure(error));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  public getDowntimeDataSelectBoxSuccess$ = this.actions$.pipe(
    ofType<GetDowntimeDataSelectBoxesSuccess>(
      DowntimeActionTypes.GetDowntimeDataSelectBoxesSuccess
    )
  );

  @Effect({ dispatch: false })
  public downtimeFailure$ = this.actions$.pipe(
    ofType<DowntimeFailure>(DowntimeActionTypes.DowntimeFailure),
    tap((error) => {
      console.log("error");
    })
  );

  public constructor(
    private downtimeService: IDownTimeMachiningService,
    private machineService: IMachineService,
    private productService: IProductService,
    private actions$: Actions,
    private mainStore$: Store<fromMain.MainState>
  ) {}
}

/**
 * manipulate api data to be readable by combo chart
 * @param data data from api to be manipulated
 * @returns data formated soo the data can be read by combo chart
 */
export function converApiDataToChartData(
  data: MimsModels.IDowntimeMachineParetoDto[]
): DowntimeModelsUI.ComboChartDataModelUI {
  let chartData: DowntimeModelsUI.ComboChartDataModelUI;

  const lineName: string = data.length > 0 ? Object.keys(data[0])[2] : "";
  const barData: DowntimeModelsUI.ComboBarChartDataModelUI[] = [];
  const lineSeries = [];

  data.forEach((elem: MimsModels.IDowntimeMachineParetoDto) => {
    barData.push({
      name: elem.AssetNumber,
      value: elem.DowntimeInMinutes,
    });
    lineSeries.push({
      name: elem.AssetNumber,
      value: elem.InstancesOfDowntime,
    });
  });

  chartData = {
    Bar: barData,
    Line: [
      {
        name: lineName,
        series: lineSeries,
      },
    ],
  };

  return chartData;
}

/**
 * Manipulate api data to be readable by table
 * @param data data from api to be manipulated
 * @returns data formated soo the data can be read by table
 */
export function convertApiDataToTableData(
  data: MimsModels.IPagedSet<MimsModels.IDowntimeMachineParetoDto>
): DowntimeModelsUI.DowntimeTableInformationModelUI {
  const tableData: DowntimeModelsUI.DowntimeTableDataModelUI[] = [];

  data.Result.forEach((elem) => {
    tableData.push({
      Machine: elem.AssetNumber,
      Downtime: elem.DowntimeInMinutes,
      Instances: elem.InstancesOfDowntime,
    });
  });

  return {
    Information: tableData,
    Total: data.Total,
  };
}

export function convertApiDataToSelectBoxes(data: any[]): any[] {
  const convertedData: any[] = [];
  let element: MimsSelectBoxModel[] = [];

  data.forEach((arrayForSelectBox) => {
    arrayForSelectBox.forEach((elem) => {
      element.push({
        name: elem.Name,
        value: elem.Id,
        selected: false,
      });
    });
    convertedData.push(element);
    element = [];
  });

  return convertedData;
}
