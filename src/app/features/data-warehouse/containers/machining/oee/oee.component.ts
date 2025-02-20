import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromReducer from '../../../data-warehouse.reducers.index';
import { GetOeeData, GetOeeDataSelectBoxes } from '../../../actions/oee.actions';
import { PagingModelUI } from '../../../../../app.models';
import { MimsSelectBoxModel } from '@mimsUI/input/select-box/models/select-box.model';
import { OeeChartDataModelUI, OeeTableDataModelUI } from '../../../models/oee.models';
import { DEFAULT_PAGING } from '../../../../../app.constants';
import { MachiningRequestModelUI } from '../../../models/downtime.models';
import { getTodayDateMinusInputDays } from '../../../../../utils/funtion.utils';

@Component
({
    selector: 'oee',
    templateUrl: './oee.component.html',
    styleUrls: ['./oee.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OeeComponent implements OnInit {

    public chartData$: Observable<OeeChartDataModelUI[]>;
    public tableData$: Observable<OeeTableDataModelUI[]>;
    public tablePaging$: Observable<PagingModelUI>;
    public machineSelectBoxData$: Observable<MimsSelectBoxModel[]>;
    public productSelectBoxData$: Observable<MimsSelectBoxModel[]>;

    private request: MachiningRequestModelUI = {
        Filters: {
            MachineId: 0,
            ProductId: 0,
            StartDate: getTodayDateMinusInputDays(14),
            EndDate: new Date().toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        },
        Paging: {
            CurrentIndex: 0,
            HowManyPerPage: 5,
            PropertyToOrderBy: 'AssetNumber',
            Total: 0,
            Ordered: true,
            IsDescending: true
        }
    };

    private tableHeaders = [
        'Product',
        'Availability',
        'Production',
        'Quality'
    ];

    private chartSize = [1100, 400];

    constructor(
        private store: Store<fromReducer.DataWarehouseState>
    ) {
        this.chartData$ = this.store.select(fromReducer.getOeeChart);
        this.tableData$ = this.store.select(fromReducer.getOeeTable);
        this.tablePaging$ = this.store.select(fromReducer.getOeeTablePaging);
        this.machineSelectBoxData$ = this.store.select(fromReducer.getOeeMachineSelectData);
        this.productSelectBoxData$ = this.store.select(fromReducer.getOeeProductSelectData);
    }

    public ngOnInit() {
        this.store.dispatch(new GetOeeDataSelectBoxes());
        this.store.dispatch(new GetOeeData(this.request));
    }

    /**
     * Request new page to backend
     * @param pageNumber the numer of the page that we want
     */
    public requestNewPage(pageNumber: number) {
        this.request.Paging.CurrentIndex = pageNumber - 1;
        this.store.dispatch(new GetOeeData(this.request));
    }

    /**
     * Request data with new filters
     * @param filters new selected filters
     */
    private filtersOptions(filters: any) {
        this.request.Filters = filters;
        this.store.dispatch(new GetOeeData(this.request));
    }
}
