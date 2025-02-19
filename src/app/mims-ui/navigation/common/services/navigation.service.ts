import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CommonNavigationService {
  constructor(public http: HttpClient) {}

  public getMenu(pathToMenu: string): Observable<any> {
    return this.http.get<any>(pathToMenu).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
