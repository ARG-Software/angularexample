import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";

export interface PagingModelUI {
  CurrentIndex: number;
  HowManyPerPage: number;
  PropertyToOrderBy?: string;
  Ordered?: boolean;
  IsDescending?: boolean;
  Total?: number;
}

export const PagingModelUIFactory = Factory.makeFactory<PagingModelUI>({
  CurrentIndex: faker.number.int({ min: 0, max: 100 }),
  HowManyPerPage: faker.number.int({ min: 1, max: 50 }),
  PropertyToOrderBy: faker.lorem.word(),
  Ordered: faker.datatype.boolean(),
  IsDescending: faker.datatype.boolean(),
  Total: faker.number.int({ min: 0, max: 1000 }),
});
