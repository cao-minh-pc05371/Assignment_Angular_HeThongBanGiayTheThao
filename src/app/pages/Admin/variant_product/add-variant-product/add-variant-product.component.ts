import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IColor } from 'src/app/interface/color.interface';
import { ISize } from 'src/app/interface/size.interface';
import { IVariant } from 'src/app/interface/variant.interface';
import { IProduct } from 'src/app/interface/products.interface';
import { ColorService } from 'src/app/services/apis/color.service';
import { SizeService } from 'src/app/services/apis/size.service';
import { VariantService } from 'src/app/services/apis/variant.service';
import { ProductService } from 'src/app/services/apis/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-variant-product',
  imports: [MatFormFieldModule, MatCardModule, MatSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-variant-product.component.html',
  styleUrls: ['./add-variant-product.component.scss']
})
export class AddVariantProductComponent implements OnInit {
  form!: FormGroup;
  sizes: ISize[] = [];
  colors: IColor[] = [];
  productId!: number;
  product: IProduct | null = null;
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private colorService: ColorService,
    private sizeService: SizeService,
    private variantService: VariantService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.snackBar.open('Không tìm thấy sản phẩm', 'Đóng', { duration: 3000 });
      this.router.navigate(['/admin/products/List-products']);
      return;
    }
    this.productId = id;

    this.initForm();
    this.fetchSizes();
    this.fetchColors();
    this.fetchProduct();
  }

  initForm(): void {
    this.form = this.fb.group({
      size_id: [null, Validators.required],
      color_id: [null, Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  fetchSizes(): void {
    this.sizeService.getAllSize().subscribe({
      next: (res: any) => {
        this.sizes = res?.data ?? res;
      },
      error: (err) => console.error('Lỗi khi lấy danh mục:', err)
    });
  }

  fetchColors(): void {
    this.colorService.getAllColor().subscribe({
      next: (res: any) => {
        this.colors = res?.data ?? res;
      },
      error: (err) => console.error('Lỗi khi lấy danh mục:', err)
    });
  }

  fetchProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        console.error('Lỗi khi lấy sản phẩm:', err);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
  
    this.errorMessage = '';
    this.isSubmitting = true;
    const payload: IVariant = {
      ...this.form.value,
      product_id: this.productId
    };
  
    this.variantService.addVariant(payload).subscribe({
      next: () => {
        this.snackBar.open('Thêm biến thể thành công!', 'Đóng', { duration: 3000 });
        this.router.navigate(['/admin/products/Detail-products/', this.productId]);
      },
      error: (err) => {
        console.error('Lỗi khi thêm biến thể:', err);
        this.errorMessage = err.error?.message || 'Thêm biến thể thất bại.';
        this.snackBar.open(this.errorMessage, 'Đóng', { duration: 3000 });
        this.isSubmitting = false;
      }
    });
  }
}
