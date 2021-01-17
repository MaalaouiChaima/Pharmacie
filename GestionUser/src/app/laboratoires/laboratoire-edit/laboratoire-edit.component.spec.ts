import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireEditComponent } from './laboratoire-edit.component';

describe('LaboratoireEditComponent', () => {
  let component: LaboratoireEditComponent;
  let fixture: ComponentFixture<LaboratoireEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoireEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
