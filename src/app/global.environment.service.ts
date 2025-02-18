import { Injectable } from '@angular/core';

export enum Environment {
  Dev = 1,
  Prod = 2,
}

@Injectable()
export class GlobalEnvironmentService {
  public getEnvironment(): Environment {
    const environment = process.env['ENV'];
    if (environment === 'development') {
      return Environment.Dev;
    }
    return Environment.Prod;
  }

  public getApiUrl() {
    return process.env['API_URL'];
  }
}
