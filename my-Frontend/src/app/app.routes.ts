import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login-component/login-component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/layout-admin/layout-admin').then((m) => m.LayoutAdmin),
    canActivate: [authGuard],
    children: [
      {
        path: 'empleados',
        loadComponent: () =>
          import('./features/admin/trabajadores-component/trabajadores-component').then(
            (m) => m.TrabajadoresComponent,
          ),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/admin/usuarios-component/usuarios-component').then(
            (m) => m.UsuariosComponent,
          ),
        canActivate: [adminGuard],
      },
      { path: '', redirectTo: 'empleados', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
