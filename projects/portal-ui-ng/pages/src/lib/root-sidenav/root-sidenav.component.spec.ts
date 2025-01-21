import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSidenavComponent } from './root-sidenav.component';

describe('RootSidenavComponent', () => {
  let component: RootSidenavComponent;
  let fixture: ComponentFixture<RootSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
