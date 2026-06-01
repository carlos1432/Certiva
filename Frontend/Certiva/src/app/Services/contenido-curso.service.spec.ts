import { TestBed } from '@angular/core/testing';

import { ContenidoCursoService } from './contenido-curso.service';

describe('ContenidoCursoService', () => {
  let service: ContenidoCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenidoCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
