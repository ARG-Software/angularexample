import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';

export interface LoginModelUI  {
    username: string;
    password: string;
}

export interface UserModelUI {
  Id: number;
  Name: string;
  Email: string;
  Login: string;
  AccountStatus?: number;
  ProfileName?: string;
}

export const LoginModelUIFactory = Factory.makeFactory<LoginModelUI>({
    username: faker.random.word(),
    password: faker.random.word()
});

export const UserModelUIFactory = Factory.makeFactory<UserModelUI> ({
    Id: faker.random.number(),
    Name: faker.random.word(),
    Email: faker.random.word(),
    Login: faker.random.word()
});
