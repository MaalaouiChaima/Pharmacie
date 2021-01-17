import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteEditComponent } from './vente-edit.component';

describe('VenteEditComponent', () => {
  let component: VenteEditComponent;
  let fixture: ComponentFixture<VenteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
