import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ContenidoCursoDTO } from '../Models/contenido-curso-dto';
import { CrearContenidoCursoDTO } from '../Models/crear-contenido-curso-dto';

@Injectable({
  providedIn: 'root',
})
export class ContenidoCursoService {
  private apiUrl = `${environment.API_URL}contenidos-curso`;

  constructor(private http: HttpClient) {}

   // GET: listar contenidos de curso
  listarContenidosCurso(): Observable<ContenidoCursoDTO[]> {
    return this.http.get<ContenidoCursoDTO[]>(this.apiUrl);
  }

  // POST: crear contenido de curso
  crearContenidoCurso(contenido: CrearContenidoCursoDTO): Observable<ContenidoCursoDTO> {
    return this.http.post<ContenidoCursoDTO>(this.apiUrl, contenido);
  }
}
