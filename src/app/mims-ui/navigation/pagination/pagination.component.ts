import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mims-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input()
  public get numItems(): number {
    return this._numItems;
  }
  public set numItems(value: number) {
    if (value !== this._numItems && value > 0) {
      this._numItems = value;

      this.buildPages();
    }
  }

  @Input()
  public get itemsPerPage(): number {
    return this._itemsPerPage;
  }
  public set itemsPerPage(value: number) {
    if (value !== this._itemsPerPage && value > 0) {
      this._itemsPerPage = value;

      this.buildPages();
    }
  }

  @Input()
  public get page(): number {
    return this._page;
  }
  public set page(value: number) {
    this._page = value;
  }
  public get totalPages(): number {
    return this._numberOfPages;
  }

  @Output() public OnChangePage = new EventEmitter();

  private _page: number;
  private _numItems: number;
  private _itemsPerPage: number;
  private _numberOfPages: number;

  constructor() {
    this._numItems = 100;
    this._itemsPerPage = 10;
    this._page = 1;
    this._numberOfPages = this._numItems / this._itemsPerPage;
  }

  public ngOnInit() {
    this.buildPages();
  }

  public changePage(value: number) {
    this.page = value;
    this.OnChangePage.emit(value);
  }

  public hasPrevious(): boolean {
    return (this.page > 1);
  }

  public hasNext(): boolean {
    return (this.page < this.totalPages);
  }

  public get middlePages(): number[] {
    const middlePages: number[] = [];
    if (this.page > 1) {
      middlePages.push(this.page - 1);
    }
    middlePages.push(this.page);
    if (this.page < this.totalPages) {
      middlePages.push(this.page + 1);
    }
    return middlePages;
  }

  private buildPages() {
    this.setPage(this._page);
  }

  private setPage(p: number) {
    this._page = Math.min(1, Math.max(this.totalPages, p));
  }

}
