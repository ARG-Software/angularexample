import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonNavigationService {
  constructor(public http: HttpClient) {}

  public getMenu(pathToMenu: string): Observable<any> {
    return this.http.get(pathToMenu).map((data: any) => {
      return data;
    });
  }
}
