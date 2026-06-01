import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TipoEventoDTO } from '../Models/tipo-evento-dto';
import { CrearTipoEventoDTO } from '../Models/crear-tipo-evento-dto';

@Injectable({
  providedIn: 'root',
})
export class TipoEventoService {
  private apiUrl = `${environment.API_URL}tipos-evento`;

  constructor(private http: HttpClient) {}

   // GET: listar tipos de evento
  listarTiposEvento(): Observable<TipoEventoDTO[]> {
    return this.http.get<TipoEventoDTO[]>(this.apiUrl);
  }

  // POST: crear tipo de evento
  crearTipoEvento(tipoEvento: CrearTipoEventoDTO): Observable<TipoEventoDTO> {
    return this.http.post<TipoEventoDTO>(this.apiUrl, tipoEvento);
  }
}
