import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../cart/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from '../cart/models/cart';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  cols: number = 3
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols]
  products: Product[] = [];
  sort: string = 'desc';
  limit: number = 12;
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }


  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService.getProducts(this.limit, this.sort, this.category).subscribe(products => {
      this.products = products;
    });
  }

  columnsCountChange(colsNumber: number): void {

    this.cols = colsNumber
    console.log(this.cols);
    this.rowHeight = ROWS_HEIGHT[this.cols]
    console.log(this.rowHeight);

  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      product: product.image,
      quantity: 1
    });
  }

  onColumnsCountChange(count: number): void {
    console.log(count);

    this.limit = count;
    this.getProducts();
  }

  onSortByChange(sort: string): void {
    console.log(sort);

    this.sort = sort;
    this.getProducts();
  }


}
