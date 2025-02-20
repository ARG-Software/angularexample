import { Observable } from 'rxjs/Observable';
import { IProductsDto } from '../../../models/apimodels';

export abstract class IProductService {
    public abstract GetProductsList(): Observable<IProductsDto[]>;
    public abstract GetProduct(productId: number): Observable<IProductsDto>;
    public abstract UpdateProduct(product: IProductsDto): Observable<boolean>;
}
