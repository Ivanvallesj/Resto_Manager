import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { InicioComponent } from './inicio.component';
import { SeleccionCategoriasComponent } from './seleccion-categorias/seleccion-categorias.component';
import { VerMenuCategoriaComponent } from './ver-menu-categoria/ver-menu-categoria.component';

const INICIO_ROUTES: Routes = [
    { 
        path: 'inicio',
        component: InicioComponent,
        children: [
            { path: '', component: BienvenidaComponent },
            { path: 'bienvenida/:idResto/:idMesa', component: BienvenidaComponent },
            { path: 'seleccion-categoria', component: SeleccionCategoriasComponent },
            { path: 'categoria-menu/:id', component: VerMenuCategoriaComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(INICIO_ROUTES)],
    exports: [RouterModule]
})
export class InicioRoutingModule {}
