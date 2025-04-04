import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/products.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-products',
  imports: [MatCardModule, CommonModule, MatIcon],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  products: IProduct[] = [
    {
      id: 1,
      name: "Nike Air Zoom Pegasus 40",
      price: 3200000,
      description: "Giày chạy bộ nhẹ, thoáng khí với công nghệ Air Zoom.",
      image: "https://example.com/nike-pegasus-40.jpg",
      categoryName: "Chạy bộ",
      stock: 20
    },
    {
      id: 2,
      name: "Adidas Ultraboost Light",
      price: 3500000,
      description: "Giày chạy bộ với đệm Boost mang lại sự êm ái tối đa.",
      image: "https://example.com/adidas-ultraboost.jpg",
      categoryName: "Chạy bộ",
      stock: 15
    },
    {
      id: 3,
      name: "Puma Future Z 1.4",
      price: 2800000,
      description: "Giày bóng đá với thiết kế ôm sát, hỗ trợ tối đa trên sân cỏ.",
      image: "https://example.com/puma-future-z.jpg",
      categoryName: "Bóng đá",
      stock: 10
    },
    {
      id: 4,
      name: "Nike LeBron 20",
      price: 4200000,
      description: "Giày bóng rổ cao cấp với hỗ trợ cổ chân và đệm Zoom Air.",
      image: "https://example.com/nike-lebron-20.jpg",
      categoryName: "Bóng rổ",
      stock: 8
    },
    {
      id: 5,
      name: "Under Armour Curry Flow 10",
      price: 3900000,
      description: "Giày bóng rổ của Stephen Curry với công nghệ đế Flow siêu bám.",
      image: "https://example.com/ua-curry-flow-10.jpg",
      categoryName: "Bóng rổ",
      stock: 12
    },
    {
      id: 6,
      name: "Mizuno Wave Lightning Z7",
      price: 3100000,
      description: "Giày cầu lông nhẹ, hỗ trợ tốt với công nghệ Wave Lightning.",
      image: "https://example.com/mizuno-wave-lightning.jpg",
      categoryName: "Cầu lông",
      stock: 18
    },
    {
      id: 7,
      name: "Yonex Power Cushion 65 Z3",
      price: 3300000,
      description: "Giày cầu lông với đệm Power Cushion hấp thụ sốc tốt.",
      image: "https://example.com/yonex-65-z3.jpg",
      categoryName: "Cầu lông",
      stock: 14
    }
  ];

  viewProduct(productId: number | string) {
    alert(`Xem chi tiết sản phẩm ID: ${productId}`);
  }

  editProduct(productId: number | string) {
    alert(`Sửa sản phẩm ID: ${productId}`);
  }

  deleteProduct(productId: number | string) {
    if (confirm(`Bạn có chắc chắn muốn xoá sản phẩm ID: ${productId} không?`)) {
      this.products = this.products.filter(p => p.id !== productId);
      alert('Sản phẩm đã được xoá thành công!');
    }
  }
}
