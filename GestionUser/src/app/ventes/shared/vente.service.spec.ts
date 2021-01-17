import { TestBed } from '@angular/core/testing';

import { VenteService } from './vente.service';

describe('VenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenteService = TestBed.get(VenteService);
    expect(service).toBeTruthy();
  });
});
