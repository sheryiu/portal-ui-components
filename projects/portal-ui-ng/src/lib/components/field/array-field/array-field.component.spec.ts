import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayFieldComponent } from './array-field.component';

describe('ArrayFieldComponent', () => {
  let component: ArrayFieldComponent;
  let fixture: ComponentFixture<ArrayFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArrayFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrayFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
