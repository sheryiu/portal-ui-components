import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeekLayoutComponent } from './peek-layout.component';

describe('PeekLayoutComponent', () => {
  let component: PeekLayoutComponent;
  let fixture: ComponentFixture<PeekLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeekLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeekLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
