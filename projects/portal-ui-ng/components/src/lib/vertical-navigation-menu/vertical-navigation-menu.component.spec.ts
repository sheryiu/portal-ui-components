import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationMenuComponent } from './vertical-navigation-menu.component';

describe('VerticalNavigationMenuComponent', () => {
  let component: VerticalNavigationMenuComponent;
  let fixture: ComponentFixture<VerticalNavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalNavigationMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
