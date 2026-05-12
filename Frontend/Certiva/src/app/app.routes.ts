import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { Home } from './pages/home/home/home';
import { Eventos } from './pages/eventos/eventos';
import { Registro } from './pages/login/registro/registro';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Usuarios } from './pages/usuarios/usuarios';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registrase', component: Registro },
  { path: 'home', component: Home, children: [
      { path: '',component: Dashboard },
      { path: 'eventos',component: Eventos },
      { path: 'usuarios', component: Usuarios },
    ]
  }
];