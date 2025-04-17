import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariantProductComponent } from './add-variant-product.component';

describe('AddVariantProductComponent', () => {
  let component: AddVariantProductComponent;
  let fixture: ComponentFixture<AddVariantProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVariantProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVariantProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
