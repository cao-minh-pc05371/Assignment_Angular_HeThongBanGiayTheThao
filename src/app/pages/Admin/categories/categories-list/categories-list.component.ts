import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ICategories } from 'src/app/interface/categories.interface';

@Component({
  selector: 'app-categories-list',
  imports: [MatCardModule, CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  categories: ICategories[] = [
    { id: 1, name: 'Bóng đá' },
    { id: 2, name: 'Bóng rổ' },
    { id: 3, name: 'Chạy bộ' },
    { id: 4, name: 'Tennis' },
    { id: 5, name: 'Cầu lông' },
    { id: 6, name: 'Leo núi' },
    { id: 7, name: 'Gym & Fitness' }
  ];
}

