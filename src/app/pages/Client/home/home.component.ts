import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  banners = [
    {
      image: 'https://media.licdn.com/dms/image/C5112AQF5Zq8eziJ7Cw/article-cover_image-shrink_600_2000/0/1520150129347?e=2147483647&v=beta&t=o_6S9A6VB6IbwzfRZFNW8xW4dgwONkl9zdZvcmE3cxI',
      alt: 'Banner 1',
      title: 'Khuyến mãi mùa hè',
      description: 'Giảm giá lên đến 50%'
    },
    {
      image: 'https://lambanner.com/wp-content/uploads/2022/10/MNT-DESIGN-BANNER-GIAY-11.jpg',
      alt: 'Banner 2',
      title: 'Bộ sưu tập mới',
      description: 'Cập nhật những mẫu mã mới nhất'
    },
    {
      image: 'https://i.ytimg.com/vi/88g98VcVIko/maxresdefault.jpg',
      alt: 'Banner 3',
      title: 'Sản phẩm bán chạy',
      description: 'Những sản phẩm được ưa chuộng nhất'
    }
  ];

  list: ICategories[] = [];
  listProduct: IProduct[] = [];
  listBrand: IBrands[] = [];
  featuredProducts: IProduct[] = [];
  saleProducts: IProduct[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.getCategories();
    this.getProducts();
    this.getBrands();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.listProduct = res?.data ?? res;
        this.filterFeaturedProducts();
        this.filterSaleProducts();
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
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }

  private filterFeaturedProducts(): void {
    this.featuredProducts = this.listProduct
      .filter(product => product.featured || product.rating >= 4)
      .slice(0, 12);
  }

  private filterSaleProducts(): void {
    this.saleProducts = this.listProduct
      .filter(product => product.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 12);
  }
  calculatePrice(originalPrice: number, discount: number): { discountedPrice: number, originalPrice: number } {
    const discountedPrice = discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
    return {
      discountedPrice: discountedPrice,
      originalPrice: originalPrice
    };
  }


  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}
