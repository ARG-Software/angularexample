import { faker } from "@faker-js/faker";
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
    name: faker.word.sample(),
    value: faker.number.int(),
    extra: null,
  });

export const ProcessDetailChartModelUIFactory =
  Factory.makeFactory<ProcessDetailChartModelUI>({
    name: faker.word.sample(),
    series: ProcessDetailValuesChartModelUIFactory.buildList(3),
  });

export const ProcessDetailTableModelUIFactory =
  Factory.makeFactory<ProcessDetailTableModelUI>({
    Id: faker.number.int(),
    MachineState: faker.word.sample(),
    Reason: faker.word.sample(),
    Duration: faker.number.int(),
    StartTime: faker.date.recent(),
    EndTime: faker.date.recent(),
  });

export const ProcessDetailTableInformationModelUIFactory =
  Factory.makeFactory<ProcessDetailTableInformationModelUI>({
    Information: ProcessDetailTableModelUIFactory.buildList(2),
    Total: faker.number.int(),
  });

export const ProcessDetailDataModelUIFactory =
  Factory.makeFactory<ProcessDetailDataModelUI>({
    Chart: ProcessDetailChartModelUIFactory.buildList(2),
    Table: ProcessDetailTableInformationModelUIFactory.build(),
  });
