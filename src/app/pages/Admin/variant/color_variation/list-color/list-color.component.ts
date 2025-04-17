import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IColor } from 'src/app/interface/color.interface';
import { ColorService } from 'src/app/services/apis/color.service';
import { DeleteComponent } from '../delete/delete.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-color',
  imports: [MatCardModule, MatIconModule, CommonModule, MatTooltipModule],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.scss'
})
export class ListColorComponent {
  readonly dialog = inject(MatDialog);

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
        this.getAllColor();
      }
     
    });
  }

  openEditDialog(id: number, name: string) {
    this.route.navigate(['/admin/color_variation/edit-color-variant', id]);
  }
}

