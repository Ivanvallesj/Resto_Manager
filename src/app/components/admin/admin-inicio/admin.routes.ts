import { Routes } from '@angular/router';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { InicioComponent } from './inicio/inicio.component';
import { NuevoMenuComponent } from './menu/nuevo-menu/nuevo-menu.component';
import { VerMenuComponent } from './menu/ver-menu/ver-menu.component';
import { NuevaMesaComponent } from './mesas/nueva-mesa/nueva-mesa.component';
import { VerMesasComponent } from './mesas/ver-mesas/ver-mesas.component';
import { VerMovimientosComponent } from './movimientos/ver-movimientos/ver-movimientos.component';
import { VerPedidosComponent } from './pedidos/ver-pedidos/ver-pedidos.component';
import { VerCategoriasComponent } from './categorias/ver-categorias/ver-categorias.component';
import { NuevaCategoriasComponent } from './categorias/nueva-categorias/nueva-categorias.component';


export const ADMIN_ROUTES: Routes = [
    {path: 'ver-mesas', component: VerMesasComponent},
    {path: 'ver-categorias', component: VerCategoriasComponent},
    {path: 'categorias/:id', component: NuevaCategoriasComponent},
    {path: 'mesa/:id', component: NuevaMesaComponent},
    {path: 'ver-menu', component: VerMenuComponent},
    {path: 'menu/:id', component: NuevoMenuComponent},
    {path: 'ver-pedidos', component: VerPedidosComponent},
    {path: 'ver-movimientos', component: VerMovimientosComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'cerrar-sesion', component: CerrarSesionComponent},
    {path: 'dashboard', component: InicioComponent},
    {path: '**', pathMatch:'full', redirectTo: 'dashboard'}
];
