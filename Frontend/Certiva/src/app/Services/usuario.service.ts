import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../Models/usuario-dto';
import { CrearUsuarioDTO } from '../Models/crear-usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.API_URL}usuarios`;

  constructor(private http: HttpClient) {}

   // GET: listar usuarios
  listarUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrl);
  }

  // POST: crear usuario
  crearUsuario(usuario: CrearUsuarioDTO): Observable<UsuarioDTO> {
    const { contrasena, ...resto } = usuario;
    return this.http.post<UsuarioDTO>(this.apiUrl, { ...resto, contraseña: contrasena });
  }
}
