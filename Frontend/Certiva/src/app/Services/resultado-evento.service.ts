import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResultadoEventoDTO } from '../Models/resultado-evento-dto';
import { CrearResultadoEventoDTO } from '../Models/crear-resultado-evento-dto';

@Injectable({
  providedIn: 'root',
})
export class ResultadoEventoService {
  private apiUrl = `${environment.API_URL}resultados-evento`;

  constructor(private http: HttpClient) {}

   // GET: listar resultados de evento
  listarResultadosEvento(): Observable<ResultadoEventoDTO[]> {
    return this.http.get<ResultadoEventoDTO[]>(this.apiUrl);
  }

  // POST: crear resultado de evento
  crearResultadoEvento(resultado: CrearResultadoEventoDTO): Observable<ResultadoEventoDTO> {
    return this.http.post<ResultadoEventoDTO>(this.apiUrl, resultado);
  }
}
