import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';

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
    name: faker.random.word(),
    value: faker.random.number()
});

export const DownTimeRecordChartModelUIFactory = Factory.makeFactory<DownTimeRecordChartModel>({
    name: faker.random.word(),
    series: ChartSeriesModelUIFactory.buildList(2)
});

export const DownTimeStatisticsChartRequestModelUIFactory = Factory.makeFactory<DownTimeStatisticsChartRequestModel>({
    productId: faker.random.number(),
    startDate: faker.date.recent()
});

export const MachineOperationsRequestModelUIFactory = Factory.makeFactory<MachineOperationsRequestModel>({
    productId: faker.random.number()
});
