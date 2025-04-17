import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVariantProductComponent } from './list-variant-product.component';

describe('ListVariantProductComponent', () => {
  let component: ListVariantProductComponent;
  let fixture: ComponentFixture<ListVariantProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVariantProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVariantProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
