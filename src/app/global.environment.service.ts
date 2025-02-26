import { Injectable, Inject } from "@angular/core";
import { APP_CONFIG, IAppConfig } from "./app.config";

export enum Environment {
  Dev = 1,
  Prod = 2,
}

@Injectable({
  providedIn: "root",
})
export class GlobalEnvironmentService {
  constructor(@Inject(APP_CONFIG) private readonly config: IAppConfig) {}

  public getEnv(): Environment {
    return this.config.env === "development"
      ? Environment.Dev
      : Environment.Prod;
  }

  public getApiUrl(): string {
    return this.config.apiUrl;
  }
}
