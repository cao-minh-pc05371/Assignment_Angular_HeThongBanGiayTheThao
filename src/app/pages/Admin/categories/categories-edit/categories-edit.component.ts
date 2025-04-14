import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategories } from 'src/app/interface/categories.interface';
import { CategoryService } from 'src/app/services/apis/category.service';

@Component({
  selector: 'app-categories-edit',
  imports: 
  [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './categories-edit.component.html',
  styleUrl: './categories-edit.component.scss'
})
export class CategoriesEditComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number = 0;
  category: ICategories = { id: 0, name: '' };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.getCategoryById(this.categoryId);
  }

  getCategoryById(id: number) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.category = category;
        this.categoryForm.patchValue({
          name: this.category.name
        });
        console.log('category: ', this.category);
        console.log('name: ', this.category.name);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    });
  }

  editCategory() {
    if (this.categoryForm.valid) {
      const updatedCategory: ICategories = this.categoryForm.value;
      this.categoryService.editCategory(this.categoryId, updatedCategory).subscribe({
        next: () => {
          this.router.navigate(['/admin/categories/List-Categories']);
        },
        error: (err) => {
          console.error('Cập nhật thất bại:', err);
        }
      });
    }
  }
}
