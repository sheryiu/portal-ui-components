import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeekableAddonComponent } from './peekable-addon.component';

describe('PeekableAddonComponent', () => {
  let component: PeekableAddonComponent;
  let fixture: ComponentFixture<PeekableAddonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeekableAddonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeekableAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
