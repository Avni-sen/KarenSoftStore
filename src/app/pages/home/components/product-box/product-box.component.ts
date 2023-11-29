import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/pages/cart/models/product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;

  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

}
