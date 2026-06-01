import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EvaluacionDTO } from '../Models/evaluacion-dto';
import { CrearEvaluacionDTO } from '../Models/crear-evaluacion-dto';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  private apiUrl = `${environment.API_URL}evaluaciones`;

  constructor(private http: HttpClient) {}

   // GET: listar evaluaciones
  listarEvaluaciones(): Observable<EvaluacionDTO[]> {
    return this.http.get<EvaluacionDTO[]>(this.apiUrl);
  }

  // POST: crear evaluación
  crearEvaluacion(evaluacion: CrearEvaluacionDTO): Observable<EvaluacionDTO> {
    return this.http.post<EvaluacionDTO>(this.apiUrl, evaluacion);
  }
}
