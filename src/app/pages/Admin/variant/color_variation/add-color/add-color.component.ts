<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/apis/color.service';

@Component({
  selector: 'app-add-color',
  imports: [MatCardModule, CommonModule, ReactiveFormsModule],
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-color',
  imports: [],
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.scss'
})
export class AddColorComponent {
<<<<<<< HEAD
  formData: FormGroup;

  constructor(
    private fb: FormBuilder,
     private colorService: ColorService,
     private router: Router) {
    this.formData = this.fb.group({
      color_name: ['', Validators.required],
      color_code: ['#000000', Validators.required],
    });
  }

  get color_name() {
    return this.formData.get('color_name');
  }

  get color_code() {
    return this.formData.get('color_code');
  }

  addColor() {
    if (this.formData.valid) {
      this.colorService.addColor(this.formData.value).subscribe({
        next: (res) => {
          this.router.navigate(['/admin/color_variation/list-color-variant']);
        },
        error: (err) => {
          alert('Có lỗi khi thêm màu!');
          console.error(err);
        },
      });
    }
  }
=======

>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
}
