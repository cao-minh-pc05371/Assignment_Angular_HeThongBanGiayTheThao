import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ISize } from 'src/app/interface/size.interface';
import { SizeService } from 'src/app/services/apis/size.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-list-color',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.scss'
})
export class ListColorComponent {
  readonly dialog = inject(MatDialog);

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
        this.getAllSize();
      }
     
    });
  }

  openEditDialog(id: number, name: string) {
    this.route.navigate(['/admin/size/Edit-Size', id]);
  }
}

