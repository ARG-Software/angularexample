import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";
import { MimsSelectBoxModel } from "@mimsUI/input/select-box/models/select-box.model";

export interface MessagingLoadDataModelUI {
  Id: number;
  DowntimeName: string;
  Duration: number;
  StartTime: string;
  EndTime: string;
  Options: MimsSelectBoxModel[];
}

export interface MessagingSaveDataModelUI {
  Id: number;
  Option: MimsSelectBoxModel;
}

export interface MessagingRequestModelUI {
  Id: number;
}

export const MessagingLoadDataModelUIFactory =
  Factory.makeFactory<MessagingLoadDataModelUI>({
    Id: faker.random.number(),
    DowntimeName: faker.random.word(),
    Duration: faker.random.number(),
    StartTime: faker.random.word(),
    EndTime: faker.random.word(),
    Options: [
      {
        value: faker.random.number(),
        name: faker.random.word(),
        selected: false,
      },
      {
        value: faker.random.number(),
        name: faker.random.word(),
        selected: true,
      },
    ],
  }).buildList(8);

export const MessagingSaveDataModelUIFactory =
  Factory.makeFactory<MessagingSaveDataModelUI>({
    Id: faker.random.number(),
    Option: {
      value: faker.random.number(),
      name: faker.random.word(),
      selected: faker.random.boolean(),
    },
  }).build();

export const MessagingRequestModelUIFactory =
  Factory.makeFactory<MessagingRequestModelUI>({
    Id: faker.random.number(),
  }).build();
