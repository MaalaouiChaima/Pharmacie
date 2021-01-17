import { TestBed } from '@angular/core/testing';

import { LaboratoireService } from './laboratoire.service';

describe('LaboratoireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaboratoireService = TestBed.get(LaboratoireService);
    expect(service).toBeTruthy();
  });
});
