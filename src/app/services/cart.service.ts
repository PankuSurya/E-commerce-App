import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'ecommerce-cart';
  cartItems: any[] = [];
  cartValue = new BehaviorSubject<any>([])

  constructor() {
    const savedCart = localStorage.getItem(this.cartKey);
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
  }

  addToCart(product: Product, variants: any[]) {
    this.cartItems.push({ product, variants });
    this.saveCart();
  }

  updateCartItem(index: number, quantity: number) {
    this.cartItems[index].variants.quantity = quantity;
    this.saveCart();
  }

  removeCartItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem(this.cartKey);
  }

  getCartItems() {
    this.cartValue.next(this.cartItems);
    return this.cartItems;
  }
}
