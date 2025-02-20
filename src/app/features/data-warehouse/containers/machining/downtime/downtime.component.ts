import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { PagingModelUI } from '../../../../../app.models';

import { Store } from '@ngrx/store';
import * as fromReducer from '../../../data-warehouse.reducers.index';
import { Observable } from 'rxjs';
import { GetDowntimeData, GetDowntimeDataSelectBoxes } from '../../../actions/downtime.actions';
import { MimsSelectBoxModel } from '@mimsUI/input/select-box/models/select-box.model';
import { ComboChartDataModelUI, DowntimeTableDataModelUI, MachiningFilterModelUI } from '../../../models/downtime.models';
import { getTodayDateMinusInputDays } from '../../../../../utils/funtion.utils';
import { DEFAULT_PAGING } from '../../../../../app.constants';
import { MachiningRequestModelUI } from '../../../models/downtime.models';

@Component({
    selector: 'downtime',
    templateUrl: './downtime.component.html',
    styleUrls: ['./downtime.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DowntimeComponent implements OnInit {

    public chartData$: Observable<ComboChartDataModelUI>;

    public tableData$: Observable<DowntimeTableDataModelUI[]>;

    public tablePaging$: Observable<PagingModelUI>;
    public machineSelectBoxData$: Observable<MimsSelectBoxModel[]>;
    public productSelectBoxData$: Observable<MimsSelectBoxModel[]>;

    public chartColors = {
        Bar: {
            domain: [
                '#01579b'
            ]
        },
        Line: {
            domain: [
                '#996633', '#a8385d', '#00bfa5', '#ff0000', '#00ff99'
            ]
        }
    };

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
        'Machine',
        'Downtime',
        'Instances'
    ];

    private chartSize = [1100, 400];

    constructor(
        private store: Store<fromReducer.DataWarehouseState>
    ) {
        this.chartData$ = this.store.select(fromReducer.getDownTimeChart);
        this.tableData$ = this.store.select(fromReducer.getDownTimeTable);
        this.tablePaging$ = this.store.select(fromReducer.getDownTimeTablePaging);
        this.machineSelectBoxData$ = this.store.select(fromReducer.getDowntimeMachineSelectData);
        this.productSelectBoxData$ = this.store.select(fromReducer.getDowntimeProductSelectData);
    }

    public ngOnInit() {
        this.store.dispatch(new GetDowntimeDataSelectBoxes());
        this.store.dispatch(new GetDowntimeData(this.request));
    }

    /**
     * Request new page to backend
     * @param pageNumber the numer of the page that we want
     */
    private requestNewPage(pageNumber: number) {
        this.request.Paging.CurrentIndex = pageNumber - 1;
        this.store.dispatch(new GetDowntimeData(this.request));
    }
    /**
     * Request data with new filters
     * @param filters new selected filters
     */
    private filtersOptions(filters: any) {
        this.request.Filters = filters;
        this.store.dispatch(new GetDowntimeData(this.request));
    }
}
