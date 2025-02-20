import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PagingModelUI } from '../../../../../../app.models';
import { ProcessDetailChartModelUI, ProcessDetailTableModelUI } from '../../../../models/process-detail.models';

@Component({
    selector: 'process-detail-information',
    templateUrl: './process-detail-information.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProcessDetailInformationComponent {

    @Input() protected chartData: ProcessDetailChartModelUI[];
    @Input() protected tableData: ProcessDetailTableModelUI[];
    @Input() protected chartSize;
    @Input() protected tableHeaders;
    @Input() protected columnNames;
    @Input() protected paginationDetails: PagingModelUI;

    @Output() protected changePage: EventEmitter<number> = new EventEmitter();

    protected startDate = new Date('2018-11-08T00:00:00');

    private changePagination(pageNumber: number) {
        this.changePage.emit(pageNumber);
    }
}
