import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgroupmemberComponent } from './addgroupmember.component';

describe('AddgroupmemberComponent', () => {
  let component: AddgroupmemberComponent;
  let fixture: ComponentFixture<AddgroupmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgroupmemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgroupmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
