import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ISize } from 'src/app/interface/size.interface';
import { SizeService } from 'src/app/services/apis/size.service';

@Component({
  selector: 'app-add-size',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-size.component.html',
  styleUrl: './add-size.component.scss'
})
export class AddSizeComponent {
  formData = new FormGroup({
    size_label: new FormControl('', [Validators.required])
  });

  errorMessage: string = '';

  get size_label() {
    return this.formData.get('size_label');
  }

  constructor(
    private sizeService: SizeService,
    private router: Router
  ) { }

  addSize() {
    this.errorMessage = '';

    if (this.formData.invalid) {
      return;
    }

    const size: ISize = {
      id: 0,
      size_label: this.formData.value.size_label ?? ''
    };

    this.sizeService.addSize(size).subscribe({
      next: () => {
        this.router.navigate(['/admin/size_variation/list-size-variant']);
      },
      error: (err) => {
        console.error('Thêm thất bại:', err);
        this.errorMessage = err.error?.message || 'Đã xảy ra lỗi khi thêm size.';
      }
    });
  }

}
