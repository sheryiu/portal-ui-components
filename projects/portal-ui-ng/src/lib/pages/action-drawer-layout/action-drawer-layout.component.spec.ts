import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDrawerLayoutComponent } from './action-drawer-layout.component';

describe('ActionDrawerLayoutComponent', () => {
  let component: ActionDrawerLayoutComponent;
  let fixture: ComponentFixture<ActionDrawerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionDrawerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionDrawerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
