import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';
import { MimsSelectBoxModel } from '@mimsUI/input/select-box/models/select-box.model';

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

export const MachineStateLoadDataModelUIFactory = Factory.makeFactory<MachineStateLoadDataModelUI>({
    Id: faker.random.number(),
    Name: faker.random.word(),
    Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyB9LjUJGYiB1swxel_dg03NiL-XujzRxowH0CWleWRzEOPEBw',
    Options: [
        {
            value: faker.random.number(),
            name: faker.random.word(),
            selected: true
        },
        {
            value: faker.random.number(),
            name: faker.random.word(),
            selected: false
        }
    ]
}).buildList(8);

export const MachineStateSaveDataModelUIFactory = Factory.makeFactory<MachineStateSaveDataModelUI>({
    Id: faker.random.number(),
    Option: {
        value: faker.random.number(),
        name: faker.random.word(),
        selected: faker.random.boolean()
    }
}).build();

export const MachineStateDataRequestModelUIFactory = Factory.makeFactory<MachineStateDataRequestModelUI>({
    machineId: faker.random.number()
}).build();
