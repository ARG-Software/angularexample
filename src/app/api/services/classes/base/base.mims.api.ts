import { GlobalEnvironmentService } from './../../../../global.environment.service';
import {  Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as MimsModels from '../../../models/apimodels';
import { HttpClient } from '@angular/common/Http';

export class BaseMimsApi {
  private baseHttp: HttpClient;
  private baseInjector: Injector;
  private apiUrl: string;
  private serverSettings: GlobalEnvironmentService;

  constructor(injector: Injector, http: HttpClient) {
    this.baseHttp = http;
    this.baseInjector = injector;
    this.serverSettings = this.baseInjector.get(GlobalEnvironmentService);
    this.apiUrl = this.serverSettings.getApiUrl();
  }

  /**
   * Using GET.
   * Method to get a list of objects from database.
   * @param path - The path from resource.
   */
  public getObjects<T>(path: string): Observable<T> {
    return this.baseHttp
      .get(`${this.apiUrl}/${path}`)
      .map((res: MimsModels.IMimsResult<any>) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => {
        return Observable.throw(new Error(error));
      });
  }


  /**
   * Using GET.
   * Method to get a object by a param from database.
   * @param param - The object param.
   * @param path - The path from resource.
   */
  public getObjectByParams<T>(path: string, params: any): Observable<T> {
    const paramsRequest = this.encodeObjectToListParams(params);
    return this.baseHttp
      .get(`${this.apiUrl}/${path}`, { params})
      .map((res: MimsModels.IMimsResult<T>) => {
        return res.Result;
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using GET.
   * Method to get a array of objects with search value using a object.GET
   * @param obj - The object value.
   * @param path - The path from resource.
   */
  public getObjectUsingQueryingObjectGET<T>(
    obj: any,
    path: string
  ): Observable<T[]> {
    const body = this.encodeObjectToListParams(obj);
    return this.baseHttp
      .get(`${this.apiUrl}/${path}?${body}`, {params: obj})
      .map((res: MimsModels.IMimsResult<T>) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using GET.
   * Method to get objects paged with search value using a object.GET
   * @param obj
   * @param path
   */
  public getPagedObjectsUsingGet<T>(obj: any, path: string): Observable<T> {
    const body = this.encodeObjectToListParams(obj);
    return this.baseHttp
      .get(`${this.apiUrl}/${path}?${body}`)
      .map((res: MimsModels.IMimsPagedResult<T>) => {
        if (res.Success) {
          return res;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using POST.
   * Method to get a  array of objects with search value using a object.POST
   * @param obj - The object value.
   * @param path - The path from resource.
   */
  public getObjectsUsingQueryingObjectPOST<T>(
    obj: any,
    path: string
  ): Observable<T[]> {
    return this.baseHttp
      .post(`${this.apiUrl}/${path}`, obj)
      .map((res: MimsModels.IMimsResult<T>) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using POST.
   * Method to get a object with search value using a objec from database.POST
   * @param obj - The object value.
   * @param path - The path from resource.
   */
  public getObjectUsingQueryingObjectPOST<T>(
    obj: any,
    path: string
  ): Observable<T> {
    return this.baseHttp
      .post(`${this.apiUrl}/${path}`,  obj)
      .map((res: MimsModels.IMimsResult<T>) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using POST.
   * Method to get a object with search value using a object from database and sending a request of type form. POST
   * @param obj - The object value.
   * @param path - The path from resource.
   */
  public getObjectUsingQueryingObjectPOSTandFormTypeRequest<T>(
    obj: any,
    path: string
  ): Observable<T> {
    const body = new FormData();
    Object.keys(obj).forEach((key) => {
      body.append(key, obj[key]);
    });
    return this.baseHttp
      .post(`${this.apiUrl}/${path}`, body)
      .map((res: MimsModels.IMimsResult<any> ) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using POST.
   * Method to get a paging object with search value from database.
   * @param obj - The object value.
   * @param path - The path from resource. This parameter is optional.
   */
  public getPagedObjectsUsingPost<T>(obj: any, path: string): Observable<T> {
    return this.baseHttp
      .post(`${this.apiUrl}/${path}`, obj)
      .map((res: MimsModels.IMimsPagedResult<any>) => {
        if (res.Success) {
          return res;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using POST.
   * Method to get a paging object with search value from database.
   * @param obj - The object value.
   * @param path - The path from resource. This parameter is optional.
   */
  public getPagedObjectsUsingPostWithMultipleParameters<T>(
    path: string,
    ...args: any[]
  ): Observable<T> {
    let body = '';
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i] != null || arguments[i] !== undefined) {
        body += JSON.stringify(arguments[i]);
      }
    }
    return this.baseHttp
      .post(`${this.apiUrl}/${path}`, body)
      .map((res: MimsModels.IMimsPagedResult<T>) => {
        if (res.Success) {
          return res;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using POST.
   * Method to insert object in database.
   * @param object - The object to be inserted in database.
   * @param path - The path from resource.
   */
  public insertObject<T>(obj: any, path: string): Observable<T> {
    return this.baseHttp
      .post(`${this.apiUrl}/${path}`, obj)
      .map((res: MimsModels.IMimsPagedResult<T>) => {
        if (res.Success) {
          return res.Result;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using PUT.
   * Method to update object in database.
   * @param object - The object to be updated in database.
   * @param path - The path from resource.
   */
  public updateObject<T>(obj: any, path: string): Observable<T> {
    return this.baseHttp
      .put(`${this.apiUrl}/${path}`, obj)
      .map((res: T) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Using PUT.
   * Method to update objects in database.
   * @param object - The objects to be updated in database.
   * @param path - The path from resource.
   */
  public updateObjects<T>(objs: T[], path?: string): Observable<T[]> {
    const body = JSON.stringify(objs);
    return this.baseHttp
      .put(`${this.apiUrl}/${path}`,  body)
      .map((res: T[]) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * Method to upload a file in repository.
   * @param object - The object to be inserted in repositiry.
   * @param path - The path from resource.
   */
  public uploadFile<T>(obj: any, path: string): Observable<T> {

    const file = obj.file.target.files[0];
    const body = new FormData();
    body.append(file.name, file, file.name);
    body.append('document', JSON.stringify(obj.document));

    return this.baseHttp
      .post(`${this.apiUrl}/${path}`, body)
      .map((res) => res)
      .catch((error) => Observable.throw(error));
  }

  /**
   * DELETE
   * Using Delete
   * Method to delete objects in database.
   * @param ids - A list of ids to be deleted in database.
   * @param path - The path from resource. This parameter is optional.
   */
  public deleteObjects<T>(objs: any, path: string): Observable<boolean> {
    return this.baseHttp
      .delete(`${this.apiUrl}/${path}`, { params: objs})
      .map((res: MimsModels.IMimsPagedResult<T>) => {
        if (res.Success) {
          return res.Success;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * DELETE
   * Using Delete
   * Method to delete objects in database.
   * @param ids - A list of ids to be deleted in database.
   * @param path - The path from resource. This parameter is optional.
   */
  public deleteObject<T>(obj: any, path: string): Observable<boolean> {
    return this.baseHttp
      .delete(`${this.apiUrl}/${path}`, { params: obj} )
      .map((res: MimsModels.IMimsPagedResult<T>) => {
        if (res.Success) {
          return res.Success;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  /**
   * DELETE
   * Using Delete
   * Method to delete objects in database by id.
   * @param id - The id to be deleted in database.
   * @param path - The path from resource. This parameter is optional.
   */
  public deleteById<T>(id: number, path: string): Observable<boolean> {
    return this.baseHttp
      .delete(`${this.apiUrl}/${path}/${id}`)
      .map((res: MimsModels.IMimsPagedResult<T>) => {
        if (res.Success) {
          return res.Success;
        } else {
          throw new Error('Could not process the request');
        }
      })
      .catch((error: any) => Observable.throw(error));
  }

  private encodeObjectToListParams(obj): any {
    return Object.keys(obj)
      .map((key) => key + '=' + obj[key])
      .join('&');
  }
}
