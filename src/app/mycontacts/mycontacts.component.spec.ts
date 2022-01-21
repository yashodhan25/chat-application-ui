import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycontactsComponent } from './mycontacts.component';

describe('MycontactsComponent', () => {
  let component: MycontactsComponent;
  let fixture: ComponentFixture<MycontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycontactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
