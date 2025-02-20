import * as faker from "faker/locale/en_US";
import * as Factory from "factory.ts";

export interface ProcessDetailValuesChartModelUI {
  name: string | Date;
  value: any;
  extra: any;
}

export interface ProcessDetailChartModelUI {
  name: string;
  series: ProcessDetailValuesChartModelUI[];
}

export interface ProcessDetailTableModelUI {
  Id?: number | null;
  MachineState: string;
  Reason: string;
  Duration: number;
  StartTime: Date;
  EndTime: Date;
}

export interface ProcessDetailTableInformationModelUI {
  Information: ProcessDetailTableModelUI[];
  Total: number;
}

export interface ProcessDetailDataModelUI {
  Chart: ProcessDetailChartModelUI[];
  Table: ProcessDetailTableInformationModelUI;
}

export const ProcessDetailValuesChartModelUIFactory =
  Factory.makeFactory<ProcessDetailValuesChartModelUI>({
    name: faker.random.word(),
    value: faker.random.number(),
    extra: null,
  });

export const ProcessDetailChartModelUIFactory =
  Factory.makeFactory<ProcessDetailChartModelUI>({
    name: faker.random.word(),
    series: ProcessDetailValuesChartModelUIFactory.buildList(3),
  });

export const ProcessDetailTableModelUIFactory =
  Factory.makeFactory<ProcessDetailTableModelUI>({
    Id: faker.random.number(),
    MachineState: faker.random.word(),
    Reason: faker.random.word(),
    Duration: faker.random.number(),
    StartTime: faker.date.recent(),
    EndTime: faker.date.recent(),
  });

export const ProcessDetailTableInformationModelUIFactory =
  Factory.makeFactory<ProcessDetailTableInformationModelUI>({
    Information: ProcessDetailTableModelUIFactory.buildList(2),
    Total: faker.random.number(),
  });

export const ProcessDetailDataModelUIFactory =
  Factory.makeFactory<ProcessDetailDataModelUI>({
    Chart: ProcessDetailChartModelUIFactory.buildList(2),
    Table: ProcessDetailTableInformationModelUIFactory.build(),
  });
