import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireListComponent } from './laboratoire-list.component';

describe('LaboratoireListComponent', () => {
  let component: LaboratoireListComponent;
  let fixture: ComponentFixture<LaboratoireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
