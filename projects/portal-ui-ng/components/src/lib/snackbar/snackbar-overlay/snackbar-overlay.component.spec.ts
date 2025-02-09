import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarOverlayComponent } from './snackbar-overlay.component';

describe('SnackbarOverlayComponent', () => {
  let component: SnackbarOverlayComponent;
  let fixture: ComponentFixture<SnackbarOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
