import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CertificadoDTO } from '../Models/certificado-dto';
import { CrearCertificadoDTO } from '../Models/crear-certificado-dto';

@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  private apiUrl = `${environment.API_URL}certificados`;

  constructor(private http: HttpClient) {}

   // GET: listar certificados
  listarCertificados(): Observable<CertificadoDTO[]> {
    return this.http.get<CertificadoDTO[]>(this.apiUrl);
  }

  // POST: crear certificado
  crearCertificado(certificado: CrearCertificadoDTO): Observable<CertificadoDTO> {
    return this.http.post<CertificadoDTO>(this.apiUrl, certificado);
  }
}
