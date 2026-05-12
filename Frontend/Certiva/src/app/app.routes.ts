import { Routes } from '@angular/router';
import { Registro } from './pages/login/registro/registro';
import { Login } from './pages/login/login/login';
import { Home } from './pages/home/home/home';
import { Eventos } from './pages/eventos/eventos';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registrase', component: Registro },
  {
    path: 'home', component: Home, children: [
      { path: 'eventos', component: Eventos }
    ]
  }
];

