import { PagingModelUI, PagingModelUIFactory } from "../../../app.models";
import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";

export interface OeeValuesChartModelUI {
  name: string;
  value: number;
}

export interface OeeChartDataModelUI {
  name: string;
  series: OeeValuesChartModelUI[];
}

export interface OeeTableDataModelUI {
  Product: string;
  Availability: number;
  Production: number;
  Quality: number;
}

export interface OeeTableInformationModelUI {
  Information: OeeTableDataModelUI[];
  Total: number;
}

export interface OeeDataModelUI {
  Chart: OeeChartDataModelUI[];
  Table: OeeTableInformationModelUI;
}

export const OeeValuesChartModelUIFactory =
  Factory.makeFactory<OeeValuesChartModelUI>({
    name: faker.word.sample(),
    value: faker.number.int(),
  });

export const OeeChartDataModelUIFactory =
  Factory.makeFactory<OeeChartDataModelUI>({
    name: faker.word.sample(),
    series: OeeValuesChartModelUIFactory.buildList(3),
  });

export const OeeTableDataModelUIFactory =
  Factory.makeFactory<OeeTableDataModelUI>({
    Product: faker.word.sample(),
    Availability: faker.number.int(),
    Production: faker.number.int(),
    Quality: faker.number.int(),
  });

export const OeeTableInformationModelUIFactory =
  Factory.makeFactory<OeeTableInformationModelUI>({
    Information: OeeTableDataModelUIFactory.buildList(2),
    Total: faker.number.int(),
  });

export const OeeDataModelUIFactory = Factory.makeFactory<OeeDataModelUI>({
  Chart: OeeChartDataModelUIFactory.buildList(2),
  Table: OeeTableInformationModelUIFactory.build(),
});
