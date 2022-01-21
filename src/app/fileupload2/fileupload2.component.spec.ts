import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fileupload2Component } from './fileupload2.component';

describe('Fileupload2Component', () => {
  let component: Fileupload2Component;
  let fixture: ComponentFixture<Fileupload2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fileupload2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fileupload2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
