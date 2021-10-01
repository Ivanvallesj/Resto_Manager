import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app/guards/auth.guard'
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component'
import { ScannerComponent } from './components/publico/scanner/scanner.component'
import { ADMIN_ROUTES } from './components/admin/admin-inicio/admin.routes';
import { InicioRoutingModule } from './components/publico/inicio/inicio.routes';

const routes: Routes = [
  { 
    path: 'admin-inicio', 
    component: AdminInicioComponent, 
    canActivate: [AuthGuard],
    children: ADMIN_ROUTES
  },
  { 
    path: 'admin-iniciarsesion',
    component: LoginComponent },

  { 
    path: 'public/scanner' ,
    component : ScannerComponent
  },
  { 
    path: '**', 
    redirectTo: 'public/scanner'
  }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    InicioRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }