import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EventoDTO } from '../Models/evento-dto';
import { CrearEventoDTO } from '../Models/crear-evento-dto';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private apiUrl = `${environment.API_URL}eventos`;

  constructor(private http: HttpClient) {}

   // GET: listar eventos
  listarEventos(): Observable<EventoDTO[]> {
    return this.http.get<EventoDTO[]>(this.apiUrl);
  }

  // POST: crear evento
  crearEvento(evento: CrearEventoDTO): Observable<EventoDTO> {
    return this.http.post<EventoDTO>(this.apiUrl, evento);
  }
}
