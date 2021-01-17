import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoiresComponent } from './laboratoires.component';

describe('LaboratoiresComponent', () => {
  let component: LaboratoiresComponent;
  let fixture: ComponentFixture<LaboratoiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
