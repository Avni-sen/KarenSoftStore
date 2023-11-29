import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string>();

  categories: string[] = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.storeService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }


}
