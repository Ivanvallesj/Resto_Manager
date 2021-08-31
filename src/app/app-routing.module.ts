import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app/guards/auth.guard'
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/publico/inicio/inicio.component';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component'
import { ScannerComponent } from './components/publico/scanner/scanner.component'
import { ADMIN_ROUTES } from './components/admin/admin-inicio/admin.routes';

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
    path: 'inicio/:idResto/:idMesa',
     component: InicioComponent 
  },
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
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
