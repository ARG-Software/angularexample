import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";
import { MimsSelectBoxModel } from "@mimsUI/input/select-box/models/select-box.model";

export interface MachineStateLoadDataModelUI {
  Id: number;
  Name: string;
  Image: string;
  Options: MimsSelectBoxModel[];
}

export interface MachineStateSaveDataModelUI {
  Id: number;
  Option: MimsSelectBoxModel;
}

export interface MachineStateDataRequestModelUI {
  machineId: number;
}

export const MachineStateLoadDataModelUIFactory =
  Factory.makeFactory<MachineStateLoadDataModelUI>({
    Id: faker.number.int(),
    Name: faker.word.sample(),
    Image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyB9LjUJGYiB1swxel_dg03NiL-XujzRxowH0CWleWRzEOPEBw",
    Options: [
      {
        value: faker.number.int(),
        name: faker.word.sample(),
        selected: true,
      },
      {
        value: faker.number.int(),
        name: faker.word.sample(),
        selected: false,
      },
    ],
  }).buildList(8);

export const MachineStateSaveDataModelUIFactory =
  Factory.makeFactory<MachineStateSaveDataModelUI>({
    Id: faker.number.int(),
    Option: {
      value: faker.number.int(),
      name: faker.word.sample(),
      selected: faker.datatype.boolean(),
    },
  }).build();

export const MachineStateDataRequestModelUIFactory =
  Factory.makeFactory<MachineStateDataRequestModelUI>({
    machineId: faker.number.int(),
  }).build();
