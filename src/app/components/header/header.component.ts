import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/pages/cart/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _cart: Cart = { items: [] }
  itemsQuantity: number = 0

  @Input() get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.reduce((prev, curr) => prev + curr.quantity, 0);
  }

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }


  getTotal() {
    return this.cart.items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);
  }

  onClearCart() {
    this.cartService.clearCart();
  }
}
