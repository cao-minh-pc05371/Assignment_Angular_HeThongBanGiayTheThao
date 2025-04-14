import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartComponent {


  constructor(
    private router: Router
  ) { }


  products = [
    { "productId": 1, name: 'Giày Nike Air Max 270', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlrsEd96yuOwXUmHH7Aps6CzY69qCmXGnDxw&s', price: 1000000, quantity: 1 },
    { "productId": 2, name: 'Giày Adidas Ultraboost 21', image: 'https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-casual-shoes-png-image_2394294.jpg', price: 1200000, quantity: 3 },
    { "productId": 3, name: 'Giày Puma RS-X3', image: 'https://product.hstatic.net/200000142885/product/z4121570251442_1ea4dad0962c57799e2306bf9b6cfe76_90c1420390b94518b2c2b45936bfbb88_master.jpg', price: 1500000, quantity: 5 },
  ];


  increaseQuantity(product: any) {
    product.quantity += 1;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  }


  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }
  

}
