import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneLayoutComponent } from './pane-layout.component';

describe('PaneLayoutComponent', () => {
  let component: PaneLayoutComponent;
  let fixture: ComponentFixture<PaneLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaneLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaneLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
