import { PagingModelUI, PagingModelUIFactory  } from '../../../app.models';
import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';

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

export const OeeValuesChartModelUIFactory = Factory.makeFactory<OeeValuesChartModelUI>({
    name: faker.random.word(),
    value: faker.random.number()
});

export const OeeChartDataModelUIFactory = Factory.makeFactory<OeeChartDataModelUI>({
    name: faker.random.word(),
    series: OeeValuesChartModelUIFactory.buildList(3)
});

export const OeeTableDataModelUIFactory = Factory.makeFactory<OeeTableDataModelUI>({
    Product: faker.random.word(),
    Availability: faker.random.number(),
    Production: faker.random.number(),
    Quality: faker.random.number()
});

export const OeeTableInformationModelUIFactory = Factory.makeFactory<OeeTableInformationModelUI>({
    Information: OeeTableDataModelUIFactory.buildList(2),
    Total: faker.random.number()
});

export const OeeDataModelUIFactory = Factory.makeFactory<OeeDataModelUI>({
    Chart: OeeChartDataModelUIFactory.buildList(2),
    Table: OeeTableInformationModelUIFactory.build()
});
