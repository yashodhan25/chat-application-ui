import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewer2Component } from './viewer2.component';

describe('Viewer2Component', () => {
  let component: Viewer2Component;
  let fixture: ComponentFixture<Viewer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Viewer2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Viewer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
