import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { IColor } from 'src/app/interface/color.interface';
import { ColorService } from 'src/app/services/apis/color.service';
import { DeleteComponent } from '../delete/delete.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-color',
  imports: [MatCardModule, MatIconModule, CommonModule, MatTooltipModule],
=======
import { ISize } from 'src/app/interface/size.interface';
import { SizeService } from 'src/app/services/apis/size.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-list-color',
  imports: [MatCardModule, MatIconModule, CommonModule],
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.scss'
})
export class ListColorComponent {
  readonly dialog = inject(MatDialog);

<<<<<<< HEAD
  color: IColor[] = [];
  constructor(
    private colorService: ColorService,
    private route: Router,
  ) { 
    this.getAllColor();
  }

  getAllColor() {
    this.colorService.getAllColor().subscribe({
      next: (res: any) => {
        this.color = res?.data ?? res;
        console.log('Color:', this.color);
      },
      error: (err) => {
        console.error('Error fetching color:', err);
=======
  size: ISize[] = [];
  constructor(
    private sizeService: SizeService,
    private route: Router,
  ) { 
    this.getAllSize();
  }

  getAllSize() {
    this.sizeService.getAllSize().subscribe({
      next: (res: any) => {
        this.size = res?.data ?? res;
        console.log('Size:', this.size);
      },
      error: (err) => {
        console.error('Error fetching size:', err);
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
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
<<<<<<< HEAD
        this.getAllColor();
=======
        this.getAllSize();
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
      }
     
    });
  }

  openEditDialog(id: number, name: string) {
<<<<<<< HEAD
    this.route.navigate(['/admin/color_variation/edit-color-variant', id]);
=======
    this.route.navigate(['/admin/size/Edit-Size', id]);
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  }
}

