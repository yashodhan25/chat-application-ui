import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupinformationComponent } from './groupinformation.component';

describe('GroupinformationComponent', () => {
  let component: GroupinformationComponent;
  let fixture: ComponentFixture<GroupinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
