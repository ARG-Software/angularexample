import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";

export interface DownTimeRecordChartModel {
  name: string;
  series: ChartSeriesModel[];
}
export interface ChartSeriesModel {
  name: string;
  value: number;
}
export interface DownTimeStatisticsChartRequestModel {
  productId: number;
  startDate: Date;
}
export interface MachineOperationsRequestModel {
  productId: number;
}

export const ChartSeriesModelUIFactory = Factory.makeFactory<ChartSeriesModel>({
  name: faker.word.noun(),
  value: faker.number.int(),
});

export const DownTimeRecordChartModelUIFactory =
  Factory.makeFactory<DownTimeRecordChartModel>({
    name: faker.word.noun(),
    series: ChartSeriesModelUIFactory.buildList(2),
  });

export const DownTimeStatisticsChartRequestModelUIFactory =
  Factory.makeFactory<DownTimeStatisticsChartRequestModel>({
    productId: faker.number.int(),
    startDate: faker.date.recent(),
  });

export const MachineOperationsRequestModelUIFactory =
  Factory.makeFactory<MachineOperationsRequestModel>({
    productId: faker.number.int(),
  });
