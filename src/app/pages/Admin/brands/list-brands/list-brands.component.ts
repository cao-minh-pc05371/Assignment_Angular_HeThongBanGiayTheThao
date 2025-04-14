import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';
import { IBrands } from 'src/app/interface/brands.interface';
import { MatIcon } from '@angular/material/icon';
import { AlertShowcaseComponent } from "../../../../common/alert.component";
import { BrandService } from 'src/app/services/apis/brands.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-brands',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardTitle, MatCardHeader, CommonModule, MatIcon],
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss'],
})
export class ListBrandsComponent {
  title = 'Danh sách thương hiệu';
  readonly dialog = inject(MatDialog);
  brands: IBrands[] = [];

  constructor(
    private brandService: BrandService,
    private route: Router,
  ) {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe({
      next: (res: any) => {
        const rawBrands = res?.data ?? res;
        this.brands = rawBrands.map((brand: any) => ({
          ...brand,
          logo: `${environment.apiUrl}${brand.logo}` // gắn đầy đủ URL ảnh
        }));
        console.log('Brands:', this.brands);
      },
      error: (e) => {
        console.error('Error fetching Brands:', e);
      }
    })
  }

  openDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { name: name, id: id },

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getAllBrands();
      }

    });
  }

  openEditDialog(id: number, name: string) {
    // Điều hướng tới trang sửa, ví dụ: /edit/5
    this.route.navigate(['/edit', id]);
  }

  addCategory() {
    // Điều hướng tới trang thêm mới
    this.route.navigate(['/add']);
  }
}
