import { GlobalEnvironmentService } from './../../../../global.environment.service';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as MimsModels from '../../../models/apimodels';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseMimsApi {
  private apiUrl: string;

  constructor(private injector: Injector, private http: HttpClient) {
    const serverSettings = this.injector.get(GlobalEnvironmentService);
    this.apiUrl = serverSettings.getApiUrl() ?? ''; // Ensure it's a string
  }

  /**
   * Using GET.
   * Method to get a list of objects from database.
   */
  public getObjects<T>(path: string): Observable<T> {
    return this.http
      .get<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`)
      .pipe(
        map((res) => {
          if (res.Success) {
            return res.Result;
          } else {
            throw new Error('Could not process the request');
          }
        }),
        catchError((error) => throwError(() => new Error(error)))
      );
  }

  /**
   * Using GET.
   * Method to get a object by a param from database.
   */
  public getObjectByParams<T>(path: string, params: any): Observable<T> {
    return this.http
      .get<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`, { params })
      .pipe(
        map((res) => res.Result),
        catchError((error) => throwError(() => error))
      );
  }

  /**
   * Using GET.
   * Method to get an array of objects with search value.
   */
  public getObjectUsingQueryingObjectGET<T extends any[]>(
    obj: any,
    path: string
  ): Observable<T> {
    const body = this.encodeObjectToListParams(obj);
    return this.http
      .get<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}?${body}`, {
        params: obj,
      })
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          else throw new Error('Could not process the request');
        }),
        catchError((error) => throwError(() => error))
      );
  }

  /**
   * Using POST.
   * Method to retrieve objects using a query object.
   */
  public getObjectsUsingQueryingObjectPOST<T extends any[]>(
    obj: any,
    path: string
  ): Observable<T> {
    return this.http
      .post<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`, obj)
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          else throw new Error('Could not process the request');
        }),
        catchError((error) => throwError(() => error))
      );
  }

  /**
   * Using POST.
   * Method to get a object with search value.
   */
  public getObjectUsingQueryingObjectPOST<T>(
    obj: any,
    path: string
  ): Observable<T> {
    return this.http
      .post<MimsModels.IMimsResult<T>>(`${this.apiUrl}/${path}`, obj)
      .pipe(
        map((res) => {
          if (res.Success) return res.Result;
          else throw new Error('Could not process the request');
        }),
        catchError((error) => throwError(() => error))
      );
  }

  /**
   * Using PUT.
   * Method to update object in database.
   */
  public updateObject<T>(obj: any, path: string): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}/${path}`, obj)
      .pipe(catchError((error) => throwError(() => error)));
  }

  /**
   * Using DELETE.
   * Method to delete an object by ID.
   */
  public deleteById<T>(id: number, path: string): Observable<boolean> {
    return this.http
      .delete<MimsModels.IMimsPagedResult<T>>(`${this.apiUrl}/${path}/${id}`)
      .pipe(
        map((res) => res.Success),
        catchError((error) => throwError(() => error))
      );
  }

  /**
   * Encode an object into URL parameters.
   */
  private encodeObjectToListParams(obj: any): string {
    return Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join('&');
  }
}
