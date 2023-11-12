import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneNavigationComponent } from './pane-navigation.component';

describe('PaneNavigationComponent', () => {
  let component: PaneNavigationComponent;
  let fixture: ComponentFixture<PaneNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaneNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaneNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
