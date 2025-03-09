import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDropdownOverlayComponent } from './base-dropdown-overlay.component';

describe('BaseDropdownOverlayComponent', () => {
  let component: BaseDropdownOverlayComponent;
  let fixture: ComponentFixture<BaseDropdownOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDropdownOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseDropdownOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
