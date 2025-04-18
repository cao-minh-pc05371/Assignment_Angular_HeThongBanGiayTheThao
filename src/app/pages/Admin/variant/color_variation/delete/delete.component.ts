import { Component, inject } from '@angular/core';
import { 
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
 } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD
import { ColorService } from 'src/app/services/apis/color.service';
=======
import { CategoryService } from 'src/app/services/apis/category.service';
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a

export interface DialogData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-delete',
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './delete.component.html'
})
export class DeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  constructor(
<<<<<<< HEAD
    private colorService: ColorService ,
=======
    private CategoryService: CategoryService ,
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  delete() {
    console.log('Delete clicked id: ' , this.data.id);
    
<<<<<<< HEAD
    this.colorService.deleteColor(this.data.id).subscribe({
=======
    this.CategoryService.deleteCategory(this.data.id).subscribe({
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
      next: (res: any) => {
        console.log('Delete response:', res);
        this.dialogRef.close(true);
      },
      error: (e) => {
        console.error('Error deleting category:', e);
      }
    });
  }
}
