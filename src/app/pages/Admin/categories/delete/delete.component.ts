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
import { CategoryService } from 'src/app/services/apis/category.service';

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
    private CategoryService: CategoryService ,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  delete() {
    console.log('Delete clicked id: ' , this.data.id);
    
    this.CategoryService.deleteCategory(this.data.id).subscribe({
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
