import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';
import { IBrands } from 'src/app/interface/brands.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-list-brands',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardTitle, MatCardHeader, CommonModule, MatIcon],
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss'],
})
export class ListBrandsComponent {
  title = 'Danh sách thương hiệu';
  brands: IBrands[] = [
    { id: 1, name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { id: 2, name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { id: 3, name: 'Puma', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png' },
    { id: 4, name: 'Reebok', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png' }
  ];
}
