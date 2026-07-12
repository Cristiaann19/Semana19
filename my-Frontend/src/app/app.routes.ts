import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

import { LoginComponent } from './features/auth/login-component/login-component';
import { LandingComponent } from './features/landing/landing-component/landing-component';
import { LayoutAdmin } from './features/admin/layout-admin/layout-admin';
import { TrabajadoresComponent } from './features/admin/trabajadores-component/trabajadores-component';
import { UsuariosComponent } from './features/admin/usuarios-component/usuarios-component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: LayoutAdmin,
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'empleados',
        component: TrabajadoresComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: '',
        redirectTo: 'empleados',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
