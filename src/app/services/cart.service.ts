import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../pages/cart/models/cart';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({ items: [] });


  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id == item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });

    this._snackBar.open('Product added to cart', 'Ok', {
      duration: 3000,
    });
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared', 'Ok', {
      duration: 3000,
    });
  }

  removeFromCart(id: number): void {
    const filteredItems = this.cart.value.items.filter(item => item.id !== id);

    this.cart.next({ items: filteredItems });

    this._snackBar.open('Product removed from cart', 'Ok', {
      duration: 3000,
    });
  }

  removeQuantity(item: CartItem): void {
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this._snackBar.open('Product quantity decreased', 'Ok', {
        duration: 3000,
      });

    } else {
      this.removeFromCart(item.id);
    }
  }

}
