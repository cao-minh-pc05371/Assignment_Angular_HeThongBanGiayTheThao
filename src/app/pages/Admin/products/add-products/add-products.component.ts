import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {
  productForm: FormGroup;
  categories = [
    { name: "Chạy bộ" },
    { name: "Bóng đá" },
    { name: "Bóng rổ" },
    { name: "Tennis" }
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1000)]],
      description: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg|jpeg|gif|svg))')]],
      categoryName: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      console.log('Sản phẩm mới:', this.productForm.value);
      alert('Sản phẩm đã được thêm thành công!');
      this.productForm.reset(); // Reset form sau khi thêm thành công
    } else {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
    }
  }
}