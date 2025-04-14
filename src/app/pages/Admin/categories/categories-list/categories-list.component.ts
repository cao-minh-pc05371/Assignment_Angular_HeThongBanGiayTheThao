import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ICategories } from 'src/app/interface/categories.interface';
import { MatIcon } from '@angular/material/icon';
import { DeleteComponent } from '../../categories/delete/delete.component';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/apis/category.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories-list',
  imports: [MatCardModule, CommonModule, MatIcon],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  readonly dialog = inject(MatDialog);

  categories: ICategories[] = [];
  constructor(
    private categoryService: CategoryService,
    private route: Router,
  ) { 
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res?.data ?? res;
        console.log('Categories:', this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    })
  }

  openDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {name: name, id: id},

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     if (result) {
        this.getAllCategories();
      }
     
    });
  }

  openEditDialog(id: number, name: string) {
    this.route.navigate(['/admin/categories/Edit-Categories', id]);
  }
}

