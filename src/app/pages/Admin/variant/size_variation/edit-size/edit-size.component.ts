import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ISize } from 'src/app/interface/size.interface';
import { SizeService } from 'src/app/services/apis/size.service';

@Component({
  selector: 'app-edit-size',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-size.component.html',
  styleUrl: './edit-size.component.scss'
})
export class EditSizeComponent implements OnInit {
  sizeForm: FormGroup;
  sizeId: number = 0;
  size: ISize = { id: 0, size_label: '' };

  constructor(
    private sizeService: SizeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.sizeForm = new FormGroup({
      size_label: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.sizeId = +this.route.snapshot.paramMap.get('id')!;
    this.getSizeById(this.sizeId);
  }

  getSizeById(id: number) {
    this.sizeService.getSizeById(id).subscribe({
      next: (size) => {
        this.size = size;
        this.sizeForm.patchValue({
          name: this.size.size_label
        });
        console.log('size: ', this.size);
        console.log('size_label: ', this.size.size_label);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    });
  }

  editSize() {
    if (this.sizeForm.valid) {
      const updatedSize: ISize = this.sizeForm.value;
      this.sizeService.updateSize(this.sizeId, updatedSize).subscribe({
        next: () => {
          this.router.navigate(['/admin/size_variation/list-size-variant']);
        },
        error: (err) => {
          console.error('Cập nhật thất bại:', err);
        }
      });
    }
  }
}
