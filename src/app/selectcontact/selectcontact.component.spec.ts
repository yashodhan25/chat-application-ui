import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcontactComponent } from './selectcontact.component';

describe('SelectcontactComponent', () => {
  let component: SelectcontactComponent;
  let fixture: ComponentFixture<SelectcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectcontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
