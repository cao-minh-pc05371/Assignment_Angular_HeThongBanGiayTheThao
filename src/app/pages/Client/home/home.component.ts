import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CategoryService } from 'src/app/services/apis/category.service';
import { ProductService } from 'src/app/services/apis/product.service';
import { BrandService } from 'src/app/services/apis/brands.service';

import { ICategories } from 'src/app/interface/categories.interface';
import { IProduct } from 'src/app/interface/products.interface';
import { IBrands } from 'src/app/interface/brands.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list: ICategories[] = [];
  listProduct: IProduct[] = [];
  listBrand: IBrands[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getProduct();
    this.getBrands();
  }

  getData(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;
        // this.list = data.filter((item: any) => item.status === 'visible');
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getProduct(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.listProduct = res?.data ?? res;
        // this.listProduct = data.filter((item: any) => item.status === 'visible');
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  getBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res: any) => {
        this.listBrand = res?.data ?? res;
        // this.listBrand = data.filter((item: any) => item.status === 'visible');
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }
}
