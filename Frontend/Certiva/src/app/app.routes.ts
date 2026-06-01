import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { Home } from './pages/home/home/home';
import { Eventos } from './pages/eventos/eventos';
import { Registro } from './pages/login/registro/registro';
import { Dashboard } from './components/dashboard/dashboard';
import { Usuarios } from './pages/usuarios/usuarios';
import { Roles } from './pages/administracion/roles/roles';
import { Certificados } from './pages/administracion/certificados/certificados';
import { Inscripciones } from './pages/administracion/inscripciones/inscripciones';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registrase', component: Registro },
  {
    path: 'home',
    component: Home,
    children: [
      { path: '', component: Dashboard },
      { path: 'eventos', component: Eventos },
      { path: 'usuarios', component: Usuarios },
      { path: 'roles', component: Roles },
      { path: 'certificados', component: Certificados },
      { path: 'inscripciones', component: Inscripciones },
    ],
  },
];
