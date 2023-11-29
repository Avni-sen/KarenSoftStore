import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './models/cart';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart = {
    items: [
      {
        id: 1,
        product: 'https://placehold.co/150',
        name: 'snickers',
        description: 'sdşlkfşdslksdşlk',
        price: 300,
        quantity: 20,

      },
      {
        id: 2,
        product: 'https://placehold.co/150',
        name: 'cart2',
        description: 'sdşlkfşdslksdşlk',
        price: 200,
        quantity: 10,

      },
      {
        id: 3,
        product: 'https://placehold.co/150',
        name: 'cart3',
        description: 'sdşlkfşdslksdşlk',
        price: 30,
        quantity: 30,

      },
      {
        id: 4,
        product: 'https://placehold.co/150',
        name: 'cart4',
        description: 'sdşlkfşgfdsfdsdslksdşlk',
        price: 400,
        quantity: 32,
      },
      {
        id: 5,
        product: 'https://placehold.co/150',
        name: 'cart5',
        description: 'sdşlkffdsfd',
        price: 350,
        quantity: 50,
      },
      {
        id: 6,
        product: 'https://placehold.co/150',
        name: 'cart6',
        description: 'sdşlkfşdslksdşlfdsk',
        price: 36,
        quantity: 60,
      },

    ]
  }

  dataSource: MatTableDataSource<CartItem>;
  displayedColumns: string[] = ['product', 'name', 'description', 'price', 'quantity', 'total', 'actions'];

  totalCost: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private http: HttpClient) { }


  ngOnInit(): void {
    this.cartService.cart.subscribe(cart => {
      this.cart = cart;
      this.dataSource = new MatTableDataSource(this.cart.items);
    });

    this.getTotalCost();
    this.getTotalPrice();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalCost() {
    this.totalCost = this.dataSource.data.reduce((acc, item) => acc + item.price, 0);
  }

  getProductPrice(item: CartItem) {
    return item.price * item.quantity;
  }

  getTotalPrice() {
    this.totalPrice = this.dataSource.data.map(t => t.price * t.quantity).reduce((acc, item) => acc + item, 0);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51OHBV8LSDNr76QZAIu6SCdcwpOwthQfzrgzxToEOz2oMGbQcPuERzUKUKS7rQL6hd5kppcaQefnRM1JNZzrRoBN700T1cIX4uo');
      stripe?.redirectToCheckout({ sessionId: res.id });
    });
  }


}
