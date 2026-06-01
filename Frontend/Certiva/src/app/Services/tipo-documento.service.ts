import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TipoDocumentoDTO } from '../Models/tipo-documento-dto';
import { CrearTipoDocumentoDTO } from '../Models/crear-tipo-documento-dto';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  private apiUrl = `${environment.API_URL}tipos-documento`;

  constructor(private http: HttpClient) {}

   // GET: listar tipos de documento
  listarTiposDocumento(): Observable<TipoDocumentoDTO[]> {
    return this.http.get<TipoDocumentoDTO[]>(this.apiUrl);
  }

  // POST: crear tipo de documento
  crearTipoDocumento(tipoDocumento: CrearTipoDocumentoDTO): Observable<TipoDocumentoDTO> {
    return this.http.post<TipoDocumentoDTO>(this.apiUrl, tipoDocumento);
  }
}
