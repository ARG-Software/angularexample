import { IShiftGraphicDto } from "@api/models/apimodels";
import { Observable } from "rxjs";
export abstract class IDownTimeRecordService {
  public abstract getDowntimeOfProductShiftGraphic(
    productId: number,
    queryStartDate: Date
  ): Observable<IShiftGraphicDto[]>;
}
