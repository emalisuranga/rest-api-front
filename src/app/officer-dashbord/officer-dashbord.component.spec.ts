import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerDashbordComponent } from './officer-dashbord.component';

describe('OfficerDashbordComponent', () => {
  let component: OfficerDashbordComponent;
  let fixture: ComponentFixture<OfficerDashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerDashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
