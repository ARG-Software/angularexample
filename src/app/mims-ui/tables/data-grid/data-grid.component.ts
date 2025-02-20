import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from "@angular/core";
import { DataGridCellModel } from "./models/data-grid-cell.model";

@Component({
  selector: "mims-data-grid",
  templateUrl: "./data-grid.component.html",
  styleUrls: ["./data-grid.component.css"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent {
  @Output() public changePagination: EventEmitter<number> = new EventEmitter();

  @Input() protected rowData: DataGridCellModel[];
  @Input() protected headerName: string[];
  @Input() protected columName: string[];
  @Input() protected pageSize: number;
  @Input() protected totalItems: number;
  @Input() protected hasPagination = true;

  // tslint:disable-next-line:no-empty
  public onSelectPage(page: number) {}

  public OnChangePage(pageNumber: number) {
    this.changePagination.emit(pageNumber);
  }
}
