import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./invitados/home/home.component').then(m => m.HomeComponent) },
    { path: 'invitados', loadComponent: () => import('./invitados/tabla/tabla.component').then(m => m.TablaComponent) },

];
