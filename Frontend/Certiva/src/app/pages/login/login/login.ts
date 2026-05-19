import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {

    const data = {
      correo: this.email,
      contraseña: this.password
    };

    this.authService.login(data).subscribe({

      next: (res: any) => {        
        console.log('LOGIN OK', res);
        localStorage.setItem('user', JSON.stringify(res));

        this.router.navigate(['/home']);
      },

      error: (err: any) => {
        console.error('ERROR LOGIN', err);
      } 
    });
  }
}