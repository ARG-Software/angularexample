import "jest";
import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";
import { Observable } from "rxjs";
import { cold, hot } from "jest-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";

import { IMachineOperationService } from "@api/services/interfaces/core/imachineoperation.service";
import { IDownTimeRecordService } from "@api/services/interfaces/core/idowntimerecord.service";

import { OverviewEffects } from "../effects/overview.effects";

import {
  DownTimeStatisticsChartRequestModel,
  DownTimeStatisticsChartRequestModelUIFactory,
  MachineOperationsRequestModel,
  MachineOperationsRequestModelUIFactory,
} from "../models/overview.models";

import {
  GetDownTimeChart,
  GetDownTimeChartSuccess,
  GetMachineOperationTable,
  GetMachineOperationTableSuccess,
  OverviewFailure,
} from "./../actions/overview.actions";

import { IMachineOperationsDto, IShiftGraphicDto } from "@api/models/apimodels";
import * as fromMain from "../../../main/main.reducers.index";

describe("Overview Effects", () => {
  let actions: Observable<any>;
  let effects: OverviewEffects;
  let machineOperationService: IMachineOperationService;
  let downtimeRecordService: IDownTimeRecordService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromMain.mainReducers)],
      providers: [
        OverviewEffects,
        provideMockActions(() => actions),
        {
          provide: IMachineOperationService,
          useValue: {
            GetMachineOperationsofProduct: jest.fn(),
          },
        },
        {
          provide: IDownTimeRecordService,
          useValue: {
            getDowntimeOfProductShiftGraphic: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    effects = TestBed.get(OverviewEffects);
    machineOperationService = TestBed.get(IMachineOperationService);
    downtimeRecordService = TestBed.get(IDownTimeRecordService);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  describe("load machine operation", () => {
    let request: MachineOperationsRequestModel;
    let mockedResponseFromApi: IMachineOperationsDto[];

    beforeEach(() => {
      request = MachineOperationsRequestModelUIFactory.build();
      mockedResponseFromApi = generateMachineOperationResponseFromApi();
    });

    it("should return a GetMachineOperationTableSuccess action, with the machine operations data, on success", () => {
      const action = new GetMachineOperationTable(request);
      const outcome = new GetMachineOperationTableSuccess(
        mockedResponseFromApi
      );

      actions = hot("a", { a: action });
      const response = cold("a|", { a: mockedResponseFromApi });
      const expected = cold("b", { b: outcome });

      machineOperationService.GetMachineOperationsofProduct = jest.fn(
        () => response
      );

      expect(effects.getMachineOperationTable$).toBeObservable(expected);
    });

    it("should return an OverviewFailure action, with an error, on failure", () => {
      const action = new GetMachineOperationTable(request);
      const error = new Error();
      const outcome = new OverviewFailure("error");

      actions = hot("a", { a: action });
      const response = cold("-#|", { a: error });
      const expected = cold("-b", { b: outcome });

      machineOperationService.GetMachineOperationsofProduct = jest.fn(
        () => response
      );

      expect(effects.getMachineOperationTable$).toBeObservable(expected);
    });
  });

  describe("load downtime record", () => {
    let request: DownTimeStatisticsChartRequestModel;
    let mockedResponseFromApi: IShiftGraphicDto[];

    beforeEach(() => {
      request = DownTimeStatisticsChartRequestModelUIFactory.build();
      mockedResponseFromApi = generateDowntimeRecordResponseFromApi();
    });

    it("should return a GetDownTimeChartSuccess action, with the downtime record data, on success", () => {
      const action = new GetDownTimeChart(request);
      const outcome = new GetDownTimeChartSuccess(mockedResponseFromApi);

      actions = hot("a", { a: action });
      const response = cold("a|", { a: mockedResponseFromApi });
      const expected = cold("b", { b: outcome });

      downtimeRecordService.getDowntimeOfProductShiftGraphic = jest.fn(
        () => response
      );

      expect(effects.getDownTimeStatisticChart$).toBeObservable(expected);
    });

    it("should return an OverviewFailure action, with an error, on failure", () => {
      const action = new GetDownTimeChart(request);
      const error = new Error();
      const outcome = new OverviewFailure("error");

      actions = hot("a", { a: action });
      const response = cold("-#|", { a: error });
      const expected = cold("-b", { b: outcome });

      downtimeRecordService.getDowntimeOfProductShiftGraphic = jest.fn(
        () => response
      );

      expect(effects.getDownTimeStatisticChart$).toBeObservable(expected);
    });
  });
});

export function generateMachineOperationResponseFromApi(): IMachineOperationsDto[] {
  const operations = Factory.makeFactory<IMachineOperationsDto>({
    Id: faker.random.number(),
    MachineName: faker.random.word(),
    OperationName: faker.random.word(),
    MachineId: faker.random.number(),
    OperationId: faker.random.number(),
    AssetNumber: faker.random.number(),
    OEE: faker.random.number(),
    MDE: faker.random.number(),
  });

  return operations.buildList(2);
}

export function generateDowntimeRecordResponseFromApi(): IShiftGraphicDto[] {
  const downtimeRecord = Factory.makeFactory<IShiftGraphicDto>({
    Uptime: faker.random.number(),
    Downtime: faker.random.number(),
    Name: faker.random.word(),
  });

  return downtimeRecord.buildList(2);
}
