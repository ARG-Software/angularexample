import { Observable } from "rxjs";
import { IContactMessageDto } from "../../../models/apimodels";

export abstract class IContactMessageService {
  public abstract GetContactMessages(): Observable<IContactMessageDto[]>;
}
