import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesonalchatComponent } from './pesonalchat.component';

describe('PesonalchatComponent', () => {
  let component: PesonalchatComponent;
  let fixture: ComponentFixture<PesonalchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesonalchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesonalchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
