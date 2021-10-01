import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.styl']
})
export class BienvenidaComponent implements AfterViewInit {

  private restoId : string = '';
  private mesaId : string = '';
  public datos_mesa! : MesaModel;
  public datos_resto! : RestoData;
  public cantidadComensales! : number;

  constructor( private _ms: MesasService, private activatedRoute : ActivatedRoute, private _rs: RestoService, private router: Router ) {
    //Recupero parametros
    this.activatedRoute.params.subscribe(params => {
      this.restoId = params.idResto;
      this.mesaId  = params.idMesa;
    })
  }

  ngAfterViewInit(): void {
    //Recupero datos del restaurant
    this._rs.public_obtenerRestaurant(this.restoId).subscribe(rd => {
      this.datos_resto = rd;
    })
    //Recupero datos de la mesa
    this._ms.obtenerMesaIndividual(this.mesaId).subscribe(mesa => {
      this.datos_mesa = mesa;
    })
  }

  registrarMesa(formulario : NgForm){

    if(formulario.invalid){
      Swal.fire('Error','La cantidad de comensales no puede estar vacía','error');
      return;
    }else{
      if(this.cantidadComensales > 0){
        this._ms.checkInMesa(this.datos_mesa,this.mesaId,this.cantidadComensales).subscribe(resp => {
          this.router.navigate(['/inicio/seleccion-categoria'])
        });
      }else{
        Swal.fire('Error','La cantidad de comensales no puede ser 0','error');
      }
    }

  }

}
