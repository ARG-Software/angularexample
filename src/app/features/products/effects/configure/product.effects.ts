import { Injectable } from '@angular/core';
import * as loadingActions from '../../../../main/actions/loading.actions';
import * as fromMain from '../../../../main/main.reducers.index';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { ConfigureActions, ConfigurationActionTypes, GetProductDetailsSuccess,
     ErrorConfiguration, SaveProductDetailsSuccess } from '../../actions/configure.actions';
import { tap, map, switchMap, finalize, catchError } from 'rxjs/operators';
import { ProductModelUI } from '../../models/configure.model';
import { Store } from '@ngrx/store';
import { IProductService } from '@api/services/interfaces/core/iproduct.service';
import { IProductsDto } from '@api/models/apimodels';
import { of } from 'rxjs/observable/of';
import { mapObjectTypeToRequested } from '../../../../utils/funtion.utils';

@Injectable()
export class ConfigureProductEffects {
    @Effect() public getProductDetails$ = this.actions$
        .pipe(
            ofType<ConfigureActions>(ConfigurationActionTypes.GetProductDetails),
            tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
            switchMap((action) =>
                this.productService.GetProduct(action.payload)
                    .pipe(
                        map((productDetails: IProductsDto) => {
                            const productDetailCasted = mapObjectTypeToRequested<ProductModelUI>(productDetails);
                            return new GetProductDetailsSuccess(productDetailCasted);
                        }),
                        catchError((error) => {
                            return of(new ErrorConfiguration(error));
                        }),
                        finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading()))
                    ))
        );
    @Effect() public saveProductDetails$ = this.actions$
        .pipe(
            ofType<ConfigureActions>(ConfigurationActionTypes.SaveProductDetails),
            tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
            map((action) => {
                const payload = action.payload;
                const payloadConvertedToDto = mapObjectTypeToRequested<IProductsDto>(action.payload);
                return [payload, payloadConvertedToDto];
            }
            ),
            switchMap(([payload, payloadConvertedToDto]) =>
                this.productService.UpdateProduct(payloadConvertedToDto)
                    .pipe(
                        map((_) => {
                            return new SaveProductDetailsSuccess(payload);
                        }),
                        catchError((error) => {
                            return of(new ErrorConfiguration(error));
                        }),
                        finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
            )));

    constructor(
        private actions$: Actions,
        private mainStore$: Store<fromMain.MainState>,
        private productService: IProductService
    ) { }
}
