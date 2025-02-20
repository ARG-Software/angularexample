import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";

export interface BufferModelUI {
  Id: number;
  ProductId?: number;
  Name?: string;
  PreviousOperationId?: number;
  NextOperationId?: number;
}

export interface WipDataModelUI extends BufferModelUI {
  Count: number;
  LowAlertLowWarning: number;
  LowWarningTarget: number;
  TargetHighWarning: number;
  HighWarningHighAlert: number;
}

export interface KanbanDataModelUI extends BufferModelUI {
  Count: number;
  LowAlertLowWarning: number;
  LowWarningTarget: number;
  TargetHighWarning: number;
  HighWarningHighAlert: number;
}

export const WipDataModelUIFactory = Factory.makeFactory<WipDataModelUI>({
  Id: faker.random.number(),
  ProductId: faker.random.number(),
  Name: faker.random.word(),
  Count: faker.random.number(),
  LowAlertLowWarning: faker.random.number(),
  LowWarningTarget: faker.random.number(),
  TargetHighWarning: faker.random.number(),
  HighWarningHighAlert: faker.random.number(),
});

export const KanbanDataModelUIFactory = Factory.makeFactory<KanbanDataModelUI>({
  Id: faker.random.number(),
  ProductId: faker.random.number(),
  Count: faker.random.number(),
  Name: faker.random.word(),
  LowAlertLowWarning: faker.random.number(),
  LowWarningTarget: faker.random.number(),
  TargetHighWarning: faker.random.number(),
  HighWarningHighAlert: faker.random.number(),
});
