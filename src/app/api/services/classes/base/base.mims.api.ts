import { GlobalEnvironmentService } from "./../../../../global.environment.service";
import { Injectable } from "@angular/core";
import * as MimsModels from "../../../models/apimodels";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class BaseMimsApi {
  private baseHttp: HttpClient;
  private apiUrl: string;

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    this.baseHttp = http;
    this.apiUrl = this.serverSettings.getApiUrl();
  }

  public getObjects<T>(path: string): Observable<T> {
    return this.baseHttp
      .get<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`)
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => new Error(error)))
      );
  }

  public getObjectByParams<T>(path: string, params: any): Observable<T> {
    return this.baseHttp
      .get<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`, { params })
      .pipe(
        map((res) => res.Result),
        catchError((error) => throwError(() => error))
      );
  }

  public getObjectUsingQueryingObjectGET<T>(
    obj: any,
    path: string
  ): Observable<T[]> {
    const body = this.encodeObjectToListParams(obj);
    return this.baseHttp
      .get<MimsModels.IMimsResult<T[]>>(`${this.apiUrl}/${path}?${body}`, {
        params: obj,
      })
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => error))
      );
  }

  public getPagedObjectsUsingGet<T>(
    obj: any,
    path: string
  ): Observable<MimsModels.IMimsPagedResult<T>> {
    const body = this.encodeObjectToListParams(obj);
    return this.baseHttp
      .get<MimsModels.IMimsPagedResult<T>>(`${this.apiUrl}/${path}?${body}`)
      .pipe(
        map((res) => {
          if (res.Success) return res;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => error))
      );
  }

  public getObjectsUsingQueryingObjectPOST<T>(
    obj: any,
    path: string
  ): Observable<T[]> {
    return this.baseHttp
      .post<MimsModels.IMimsResult<T[]>>(`${this.apiUrl}/${path}`, obj)
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => error))
      );
  }

  public getObjectUsingQueryingObjectPOST<T>(
    obj: any,
    path: string
  ): Observable<T> {
    return this.baseHttp
      .post<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`, obj)
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => error))
      );
  }

  public getObjectUsingQueryingObjectPOSTandFormTypeRequest<T>(
    obj: any,
    path: string
  ): Observable<T> {
    const body = new FormData();
    Object.keys(obj).forEach((key) => body.append(key, obj[key]));

    return this.baseHttp
      .post<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`, body)
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => error))
      );
  }

  public getPagedObjectsUsingPost<T>(
    obj: any,
    path: string
  ): Observable<MimsModels.IMimsPagedResult<T>> {
    return this.baseHttp
      .post<MimsModels.IMimsPagedResult<T>>(`${this.apiUrl}/${path}`, obj)
      .pipe(
        map((res) => {
          if (res.Success) return res;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => error))
      );
  }

  public insertObject<T>(obj: any, path: string): Observable<T> {
    return this.baseHttp
      .post<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`, obj)
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          throw new Error("Could not process the request");
        }),
        catchError((error) => throwError(() => error))
      );
  }

  public updateObject<T>(obj: any, path: string): Observable<T> {
    return this.baseHttp.put<T>(`${this.apiUrl}/${path}`, obj).pipe(
      map((res) => res),
      catchError((error) => throwError(() => error))
    );
  }

  public updateObjects<T>(objs: T[], path?: string): Observable<T[]> {
    return this.baseHttp
      .put<T[]>(`${this.apiUrl}/${path}`, JSON.stringify(objs))
      .pipe(
        map((res) => res),
        catchError((error) => throwError(() => error))
      );
  }

  public uploadFile<T>(obj: any, path: string): Observable<T> {
    const file = obj.file.target.files[0];
    const body = new FormData();
    body.append(file.name, file, file.name);
    body.append("document", JSON.stringify(obj.document));

    return this.baseHttp.post<T>(`${this.apiUrl}/${path}`, body).pipe(
      map((res) => res),
      catchError((error) => throwError(() => error))
    );
  }

  public deleteObjects<T>(objs: any, path: string): Observable<boolean> {
    return this.baseHttp
      .delete<MimsModels.IMimsPagedResult<T>>(`${this.apiUrl}/${path}`, {
        params: objs,
      })
      .pipe(
        map((res) => res.Success),
        catchError((error) => throwError(() => error))
      );
  }

  public deleteObject<T>(obj: any, path: string): Observable<boolean> {
    return this.baseHttp
      .delete<MimsModels.IMimsPagedResult<T>>(`${this.apiUrl}/${path}`, {
        params: obj,
      })
      .pipe(
        map((res) => res.Success),
        catchError((error) => throwError(() => error))
      );
  }

  public deleteById<T>(id: number, path: string): Observable<boolean> {
    return this.baseHttp
      .delete<MimsModels.IMimsPagedResult<T>>(`${this.apiUrl}/${path}/${id}`)
      .pipe(
        map((res) => res.Success),
        catchError((error) => throwError(() => error))
      );
  }

  private encodeObjectToListParams(obj: any): any {
    return Object.keys(obj)
      .map((key) => key + "=" + encodeURIComponent(obj[key]))
      .join("&");
  }
}
