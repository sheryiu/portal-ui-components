import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPanelComponent } from './dropdown-panel.component';

describe('DropdownPanelComponent', () => {
  let component: DropdownPanelComponent;
  let fixture: ComponentFixture<DropdownPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
