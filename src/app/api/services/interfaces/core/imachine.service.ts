import { Observable } from "rxjs";
import { IMachineDto } from "../../../models/apimodels";

export abstract class IMachineService {
  public abstract GetMachines(): Observable<IMachineDto[]>;
}
