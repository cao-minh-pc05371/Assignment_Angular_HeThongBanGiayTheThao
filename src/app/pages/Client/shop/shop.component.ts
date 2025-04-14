import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  constructor(
    private router: Router
  ){}


  products = [
  {"productId": 1, name: 'Giày Nike Air Max 270', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlrsEd96yuOwXUmHH7Aps6CzY69qCmXGnDxw&s', price: 1000000 },
  {"productId": 2, name: 'Giày Adidas Ultraboost 21', image: 'https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-casual-shoes-png-image_2394294.jpg', price: 1200000 },
  {"productId": 3, name: 'Giày Puma RS-X3', image: 'https://product.hstatic.net/200000142885/product/z4121570251442_1ea4dad0962c57799e2306bf9b6cfe76_90c1420390b94518b2c2b45936bfbb88_master.jpg', price: 1500000 },
  {"productId": 5, name: 'Giày Nike Air Force 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRPU7NANgivcef3l-TwfyL7Vkhr5kF3w30g&s', price: 1100000 },
  {"productId": 6, name: 'Giày Adidas NMD R1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlrsEd96yuOwXUmHH7Aps6CzY69qCmXGnDxw&s', price: 900000 },
  {"productId": 7, name: 'Giày Nike Zoom Pegasus 38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhxwvrpj7otPNoeBJkvpBDCPX8tPu0AoBtFg&s', price: 1400000 },
  {"productId": 8, name: 'Giày Reebok Classic', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9TvfP9P0HdC0y3m62sVJVJ2bCpx-6Uz0IA&s', price: 1350000 },
  {"productId": 9, name: 'Giày Nike Air Zoom Winflo 8', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdAXZNBmAj3F-3MeLT7BB3TyaKSGOThFbrOA&s', price: 1250000 },
  {"productId": 10, name: 'Giày Adidas Superstar', image: 'https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-casual-shoes-png-image_2394294.jpg', price: 1600000 },
  {"productId": 11, name: 'Giày Nike Air Jordan 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRPU7NANgivcef3l-TwfyL7Vkhr5kF3w30g&s', price: 2000000 },
  {"productId": 12, name: 'Giày Nike Air Max 90', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhxwvrpj7otPNoeBJkvpBDCPX8tPu0AoBtFg&s', price: 1800000 },
  {"productId": 13, name: 'Giày New Balance 990v5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRPU7NANgivcef3l-TwfyL7Vkhr5kF3w30g&s', price: 1100000 },
];

}