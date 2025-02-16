import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPanelComponent } from './loading-panel.component';

describe('LoadingPanelComponent', () => {
  let component: LoadingPanelComponent;
  let fixture: ComponentFixture<LoadingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
