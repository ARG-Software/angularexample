import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { Injectable } from "@angular/core";
import { IProductService } from "../../interfaces/core/iproduct.service";
import { IProductsDto } from "../../../models/apimodels";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class ProductService extends BaseMimsApi implements IProductService {
  private controllerRoute = "Product";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  public GetProduct(productId: number): Observable<IProductsDto> {
    return this.getObjectByParams(
      `${this.controllerRoute}/getSingleProductDto`,
      { productId }
    );
  }

  public UpdateProduct(product: IProductsDto): Observable<boolean> {
    return this.updateObject(product, `${this.controllerRoute}`);
  }

  public GetProductsList(): Observable<IProductsDto[]> {
    return this.getObjects(`${this.controllerRoute}`);
  }
}
