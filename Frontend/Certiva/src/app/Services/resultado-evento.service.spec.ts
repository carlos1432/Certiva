import { TestBed } from '@angular/core/testing';

import { ResultadoEventoService } from './resultado-evento.service';

describe('ResultadoEventoService', () => {
  let service: ResultadoEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
