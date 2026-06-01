import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../Services/login.service';
import { AuthService } from '../../../core/auth.service';
import { LoginDTO } from '../../../Models/login-dto';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  credenciales: LoginDTO = {
    correo: '',
    contrasena: '',
  };

  errorMensaje = '';
  cargando = false;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion(): void {
    this.errorMensaje = '';
    this.cargando = true;

    this.loginService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        this.authService.guardarSesion(respuesta);
        this.cargando = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = 'Correo o contraseña incorrectos';
        console.error('Error al iniciar sesión', err);
      },
    });
  }
}
