import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { InscripcionDTO } from '../Models/inscripcion-dto';
import { CrearInscripcionDTO } from '../Models/crear-inscripcion-dto';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private apiUrl = `${environment.API_URL}inscripciones`;

  constructor(private http: HttpClient) {}

   // GET: listar inscripciones
  listarInscripciones(): Observable<InscripcionDTO[]> {
    return this.http.get<InscripcionDTO[]>(this.apiUrl);
  }

  // POST: crear inscripción
  crearInscripcion(inscripcion: CrearInscripcionDTO): Observable<InscripcionDTO> {
    return this.http.post<InscripcionDTO>(this.apiUrl, inscripcion);
  }
}
