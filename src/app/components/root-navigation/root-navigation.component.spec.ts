import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootNavigationComponent } from './root-navigation.component';

describe('RootNavigationComponent', () => {
  let component: RootNavigationComponent;
  let fixture: ComponentFixture<RootNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
