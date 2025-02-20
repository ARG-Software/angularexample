import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";
import { PagingModelUI, PagingModelUIFactory } from "../../../app.models";

export interface ColorNameModelUI {
  domain: string[];
}

export interface ComboChartColorsModelUI {
  Bar: ColorNameModelUI;
  Line: ColorNameModelUI;
}

export interface ComboBarChartDataModelUI {
  name: string;
  value: number;
}

export interface ComboLineChartDataModelUI {
  name: string;
  series: ComboBarChartDataModelUI[];
}

export interface ComboChartDataModelUI {
  Bar: ComboBarChartDataModelUI[];
  Line: ComboLineChartDataModelUI[];
}

export interface DowntimeTableDataModelUI {
  Machine: string;
  Downtime: number;
  Instances: number;
}

export interface DowntimeTableInformationModelUI {
  Information: DowntimeTableDataModelUI[];
  Total: number;
}

export interface DowntimeDataModelUI {
  Chart: ComboChartDataModelUI;
  Table: DowntimeTableInformationModelUI;
}

export interface MachiningFilterModelUI {
  MachineId: number;
  ProductId: number;
  StartDate: string;
  EndDate: string;
}

export interface MachiningRequestModelUI {
  Filters: MachiningFilterModelUI;
  Paging: PagingModelUI;
}

export const ComboBarChartDataModelUIFactory =
  Factory.makeFactory<ComboBarChartDataModelUI>({
    name: faker.word.sample(),
    value: faker.number.int(),
  });

export const ComboLineChartDataModelUIFactory =
  Factory.makeFactory<ComboLineChartDataModelUI>({
    name: faker.word.sample(),
    series: ComboBarChartDataModelUIFactory.buildList(2),
  });

export const ComboChartDataModelUIFactory =
  Factory.makeFactory<ComboChartDataModelUI>({
    Bar: ComboBarChartDataModelUIFactory.buildList(3),
    Line: ComboLineChartDataModelUIFactory.buildList(2),
  });

export const DowntimeTableDataModelUIFactory =
  Factory.makeFactory<DowntimeTableDataModelUI>({
    Machine: faker.word.sample(),
    Downtime: faker.number.int(),
    Instances: faker.number.int(),
  });

export const DowntimeTableInformationModelUIFactory =
  Factory.makeFactory<DowntimeTableInformationModelUI>({
    Information: DowntimeTableDataModelUIFactory.buildList(2),
    Total: faker.number.int(),
  });

export const DowntimeDataModelUIFactory =
  Factory.makeFactory<DowntimeDataModelUI>({
    Chart: ComboChartDataModelUIFactory.build(),
    Table: DowntimeTableInformationModelUIFactory.build(),
  });

export const MachiningFilterModelUIFactory =
  Factory.makeFactory<MachiningFilterModelUI>({
    MachineId: faker.number.int(),
    ProductId: faker.number.int(),
    StartDate: faker.date.recent().toISOString(),
    EndDate: faker.date.recent().toISOString(),
  });

export const MachiningRequestModelUIFactory =
  Factory.makeFactory<MachiningRequestModelUI>({
    Filters: MachiningFilterModelUIFactory.build(),
    Paging: PagingModelUIFactory.build(),
  });
