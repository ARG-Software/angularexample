import { Observable } from "rxjs";
import { ISubcontractorsDto } from "../../../models/apimodels";

export abstract class ISubcontractorService {
  public abstract GetSubcontractors(): Observable<ISubcontractorsDto[]>;
}
