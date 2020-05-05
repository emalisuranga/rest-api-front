import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriminalCaseComponent } from './criminal-case.component';

describe('CriminalCaseComponent', () => {
  let component: CriminalCaseComponent;
  let fixture: ComponentFixture<CriminalCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriminalCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriminalCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
