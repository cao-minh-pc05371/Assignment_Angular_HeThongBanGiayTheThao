import { Component, Input, OnInit } from '@angular/core';
import { IVariant } from 'src/app/interface/variant.interface';
import { VariantService } from 'src/app/services/apis/variant.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-variant-product',
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './list-variant-product.component.html',
  styleUrls: ['./list-variant-product.component.scss']
})
export class ListVariantProductComponent {
  @Input() productId!: number | undefined;
  variants: IVariant[] = [];
  isLoading = true;
  error = '';
  displayedColumns: string[] = ['id', 'size', 'color', 'stock', 'actions'];

  constructor(
    private variantService: VariantService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchVariants();
  }

  fetchVariants(): void {
    if (typeof this.productId !== 'number') {
      this.error = 'Không tìm thấy sản phẩm để lấy biến thể';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.variantService.getVariantByProduct(this.productId).subscribe({
      next: (res) => {
        this.variants = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Không thể tải danh sách biến thể';
        this.isLoading = false;
        console.error('[❌ Lỗi]:', err);
      }
    });
  }

  openAddDialog(): void {
    this.router.navigate(['/admin/variant-product/add-variant-product', this.productId]);
  }

  openEditDialog(variant: IVariant): void {
    this.router.navigate(['/admin/variant-product/edit-variant-product', variant.id]);
  }

  deleteVariant(variantId: number): void {
    if (!confirm('Bạn có chắc muốn xoá biến thể này?')) return;

    this.variantService.deleteVariant(variantId).subscribe({
      next: () => {
        this.snackBar.open('Đã xoá biến thể thành công!', 'Đóng', { duration: 3000 });
        this.fetchVariants();
      },
      error: (err) => {
        console.error('Lỗi xoá biến thể:', err);
        this.snackBar.open('Xoá biến thể thất bại!', 'Đóng', { duration: 3000 });
      }
    });
  }
}
