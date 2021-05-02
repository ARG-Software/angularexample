import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PagingModelUI } from '../../../../../../app.models';
import { DowntimeTableDataModelUI, ComboChartDataModelUI } from '../../../../models/downtime.models';

@Component
({
    selector: 'downtime-information',
    templateUrl: './downtime-information.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DowntimeInformationComponent {

    @Output() public changePage: EventEmitter<number> = new EventEmitter();

    @Input() protected chartData: ComboChartDataModelUI;
    @Input() protected tableData: DowntimeTableDataModelUI[];
    @Input() protected chartColors;
    @Input() protected chartSize;
    @Input() protected tableHeaders;
    @Input() protected paginationDetails: PagingModelUI;

    private changePagination(pageNumber: number) {
        this.changePage.emit(pageNumber);
    }
}
