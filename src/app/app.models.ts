import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';

export interface PagingModelUI {
    CurrentIndex: number;
    HowManyPerPage: number;
    PropertyToOrderBy?: string;
    Ordered?: boolean;
    IsDescending?: boolean;
    Total?: number;
}

export const PagingModelUIFactory = Factory.makeFactory<PagingModelUI>({
    CurrentIndex: faker.random.number(),
    HowManyPerPage: faker.random.number(),
    PropertyToOrderBy: faker.random.word(),
    Ordered: faker.random.boolean(),
    IsDescending: faker.random.boolean(),
    Total: faker.random.number()
});
