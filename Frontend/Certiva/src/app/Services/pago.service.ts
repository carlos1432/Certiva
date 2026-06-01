import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PagoDTO } from '../Models/pago-dto';
import { CrearPagoDTO } from '../Models/crear-pago-dto';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrl = `${environment.API_URL}pagos`;

  constructor(private http: HttpClient) {}

   // GET: listar pagos
  listarPagos(): Observable<PagoDTO[]> {
    return this.http.get<PagoDTO[]>(this.apiUrl);
  }

  // POST: crear pago
  crearPago(pago: CrearPagoDTO): Observable<PagoDTO> {
    return this.http.post<PagoDTO>(this.apiUrl, pago);
  }
}
