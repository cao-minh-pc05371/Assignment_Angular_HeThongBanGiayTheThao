import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ICategories } from 'src/app/interface/categories.interface';
import { CategoryService } from 'src/app/services/apis/category.service';

@Component({
  selector: 'app-categories-add',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './categories-add.component.html',
  styleUrl: './categories-add.component.scss'
})
export class CategoriesAddComponent {

  formData = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  get name() {
    return this.formData.get('name');
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  addCategory() {
    if (this.formData.invalid) {
      return;
    }

    const category: ICategories = {
      id: 0,
      name: this.formData.value.name ?? ''
    };

    this.categoryService.addCategory(category).subscribe({
      next: () => {
        this.router.navigate(['/admin/categories/List-Categories']);
      },
      error: (err) => {
        console.error('Thêm thất bại:', err);
      }
    });
  }
}
