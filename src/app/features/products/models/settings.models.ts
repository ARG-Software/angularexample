import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

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
  Id: faker.number.int(),
  ProductId: faker.number.int(),
  Name: faker.word.sample(),
  Count: faker.number.int(),
  LowAlertLowWarning: faker.number.int(),
  LowWarningTarget: faker.number.int(),
  TargetHighWarning: faker.number.int(),
  HighWarningHighAlert: faker.number.int(),
});

export const KanbanDataModelUIFactory = Factory.makeFactory<KanbanDataModelUI>({
  Id: faker.number.int(),
  ProductId: faker.number.int(),
  Count: faker.number.int(),
  Name: faker.word.sample(),
  LowAlertLowWarning: faker.number.int(),
  LowWarningTarget: faker.number.int(),
  TargetHighWarning: faker.number.int(),
  HighWarningHighAlert: faker.number.int(),
});
