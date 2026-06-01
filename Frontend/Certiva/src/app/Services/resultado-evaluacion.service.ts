import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResultadoEvaluacionDTO } from '../Models/resultado-evaluacion-dto';
import { CrearResultadoEvaluacionDTO } from '../Models/crear-resultado-evaluacion-dto';

@Injectable({
  providedIn: 'root',
})
export class ResultadoEvaluacionService {
  private apiUrl = `${environment.API_URL}resultados-evaluacion`;

  constructor(private http: HttpClient) {}

   // GET: listar resultados de evaluación
  listarResultadosEvaluacion(): Observable<ResultadoEvaluacionDTO[]> {
    return this.http.get<ResultadoEvaluacionDTO[]>(this.apiUrl);
  }

  // POST: crear resultado de evaluación
  crearResultadoEvaluacion(resultado: CrearResultadoEvaluacionDTO): Observable<ResultadoEvaluacionDTO> {
    return this.http.post<ResultadoEvaluacionDTO>(this.apiUrl, resultado);
  }
}
