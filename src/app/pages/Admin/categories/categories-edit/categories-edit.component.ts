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
<<<<<<< HEAD
  imports: [
=======
  imports: 
  [
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './categories-edit.component.html',
<<<<<<< HEAD
  styleUrls: ['./categories-edit.component.scss']
=======
  styleUrl: './categories-edit.component.scss'
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
})
export class CategoriesEditComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number = 0;
  category: ICategories = { id: 0, name: '' };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
<<<<<<< HEAD
  ) {}

  ngOnInit() {
    // Lấy categoryId từ route
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.getCategoryById(this.categoryId);
  }

  // Khởi tạo form
  initForm() {
=======
  ) {
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

<<<<<<< HEAD
  // Lấy danh mục theo ID
=======
  ngOnInit() {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.getCategoryById(this.categoryId);
  }

>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  getCategoryById(id: number) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.category = category;
<<<<<<< HEAD
        // Update form value
        this.categoryForm.patchValue({
          name: this.category.name
        });
=======
        this.categoryForm.patchValue({
          name: this.category.name
        });
        console.log('category: ', this.category);
        console.log('name: ', this.category.name);
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    });
  }

<<<<<<< HEAD
  // Cập nhật danh mục
  editCategory() {
    if (this.categoryForm.valid) {
      const updatedCategory: ICategories = this.categoryForm.value;
      this.categoryService.updateCategory(this.categoryId, updatedCategory).subscribe({
        next: () => {
          // Điều hướng về trang danh sách sau khi cập nhật thành công
=======
  editCategory() {
    if (this.categoryForm.valid) {
      const updatedCategory: ICategories = this.categoryForm.value;
      this.categoryService.editCategory(this.categoryId, updatedCategory).subscribe({
        next: () => {
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
          this.router.navigate(['/admin/categories/List-Categories']);
        },
        error: (err) => {
          console.error('Cập nhật thất bại:', err);
        }
      });
    }
  }
}
