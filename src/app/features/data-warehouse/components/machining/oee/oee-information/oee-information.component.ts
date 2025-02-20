import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  OeeTableDataModelUI,
  OeeChartDataModelUI,
} from "../../../../models/oee.models";
import { PagingModelUI } from "src/app/app.models";

@Component({
  selector: "oee-information",
  templateUrl: "./oee-information.component.html",
  styleUrls: ["./oee-information.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OeeInformationComponent {
  @Input() private chartData: OeeChartDataModelUI[];
  @Input() private tableData: OeeTableDataModelUI[];
  @Input() private paginationDetails: PagingModelUI;
  @Input() private chartSize: any;
  @Input() private tableHeaders: any;

  @Output() private changePage: EventEmitter<number> = new EventEmitter();

  private changePagination(pageNumber: number) {
    this.changePage.emit(pageNumber);
  }
}
