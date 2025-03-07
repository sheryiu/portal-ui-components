import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDropdownComponent } from './base-dropdown.component';

describe('BaseDropdownComponent', () => {
  let component: BaseDropdownComponent;
  let fixture: ComponentFixture<BaseDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
