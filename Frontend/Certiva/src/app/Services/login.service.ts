import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginDTO } from '../Models/login-dto';
import { LoginResponseDTO } from '../Models/login-response-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.API_URL}login`;

  constructor(private http: HttpClient) {}

  // POST: iniciar sesión
  login(credenciales: LoginDTO): Observable<LoginResponseDTO> {
    const { contrasena, ...resto } = credenciales;
    return this.http.post<LoginResponseDTO>(this.apiUrl, { ...resto, contraseña: contrasena });
  }
}
