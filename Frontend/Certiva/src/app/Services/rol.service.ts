import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RolDTO } from '../Models/rol-dto';
import { CrearRolDTO } from '../Models/crear-rol-dto';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private apiUrl = `${environment.API_URL}roles`;

  constructor(private http: HttpClient) {}

   // GET: listar roles
  listarRoles(): Observable<RolDTO[]> {
    return this.http.get<RolDTO[]>(this.apiUrl);
  }

  // POST: crear rol
  crearRol(rol: CrearRolDTO): Observable<RolDTO> {
    return this.http.post<RolDTO>(this.apiUrl, rol);
  }
}
