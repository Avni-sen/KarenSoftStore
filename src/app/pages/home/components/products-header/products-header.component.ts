import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss']
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();


  sorts = [
    { id: 1, name: 'desc' },
    { id: 2, name: 'asc' }
  ];

  selectedSort: string = 'desc';

  itemsShowCount: number = 12;

  constructor() { }

  ngOnInit() {
  }

  changeSort(sort: string): void {
    this.selectedSort = sort;
    this.sortChange.emit(sort);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  changeCartColumnsUpdate(colNums: number): void {
    this.columnsCountChange.emit(colNums);
  }

}
