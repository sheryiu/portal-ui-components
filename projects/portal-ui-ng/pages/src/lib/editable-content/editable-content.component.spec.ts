import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableContentComponent } from './editable-content.component';

describe('EditableContentComponent', () => {
  let component: EditableContentComponent;
  let fixture: ComponentFixture<EditableContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
