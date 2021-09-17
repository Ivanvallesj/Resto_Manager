import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { InicioComponent } from './inicio.component';
import { SeleccionCategoriasComponent } from './seleccion-categorias/seleccion-categorias.component';

const INICIO_ROUTES: Routes = [
    { 
        path: 'inicio',
        component: InicioComponent,
        children: [
            { path: '', component: BienvenidaComponent },
            { path: 'bienvenida/:idResto/:idMesa', component: BienvenidaComponent },
            { path: 'seleccion-categoria', component: SeleccionCategoriasComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(INICIO_ROUTES)],
    exports: [RouterModule]
})
export class InicioRoutingModule {}
