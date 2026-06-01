import { Injectable } from '@angular/core';
import { LoginResponseDTO } from '../Models/login-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'certiva_user';

  guardarSesion(usuario: LoginResponseDTO): void {
    localStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }

  obtenerSesion(): LoginResponseDTO | null {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as LoginResponseDTO;
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.storageKey);
  }

  estaAutenticado(): boolean {
    return this.obtenerSesion() !== null;
  }
}
