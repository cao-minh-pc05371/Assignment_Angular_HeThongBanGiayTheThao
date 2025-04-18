<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { IColor } from 'src/app/interface/color.interface';
import { ColorService } from 'src/app/services/apis/color.service';

@Component({
  selector: 'app-edit-color',
  imports: [MatCardModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-color.component.html',
  styleUrl: './edit-color.component.scss'
})
export class EditColorComponent implements OnInit {
  formData!: FormGroup;
  colorId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private colorService: ColorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      color_name: ['', Validators.required],
      color_code: ['#000000', Validators.required]
    });

    this.colorId = +this.route.snapshot.paramMap.get('id')!;
    if (this.colorId) {
      this.loadColor(this.colorId);
    }
  }

  get color_name() {
    return this.formData.get('color_name');
  }

  loadColor(id: number): void {
    this.colorService.getColorById(id).subscribe({
      next: (color: IColor) => {
        this.formData.patchValue({
          color_name: color.color_name,
          color_code: color.color_code
        });
      },
      error: (err) => {
        console.error('Lỗi lấy dữ liệu màu:', err);
      }
    });
  }

  updateColor(): void {
    if (this.formData.invalid) return;

    const updatedColor: IColor = this.formData.value;

    this.colorService.updateColor(this.colorId, updatedColor).subscribe({
      next: () => {
        this.router.navigate(['/admin/color_variation/list-color-variant']);
      },
      error: (err) => {
        console.error('Lỗi cập nhật màu:', err);
        alert('Đã xảy ra lỗi khi cập nhật màu');
      }
    });
  }
}
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-color',
  imports: [],
  templateUrl: './edit-color.component.html',
  styleUrl: './edit-color.component.scss'
})
export class EditColorComponent {

}
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
