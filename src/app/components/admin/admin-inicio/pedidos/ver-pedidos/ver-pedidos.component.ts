import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.styl']
})
export class VerPedidosComponent implements OnInit, OnDestroy {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();
  datos_mesas : MesaModel[] = [];
  intervalo : any;
  internalSub! : Subscription;

  constructor(private restoService : RestoService, private _ms: MesasService) { }

  ngOnDestroy(){
    clearInterval(this.intervalo);
    this.internalSub.unsubscribe();
  }

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this._ms.obtenerMesas().subscribe(resp => {
      this.datos_mesas = resp;
    })
      //Ejecuto la funcion para escuchar y me subscribo
    this.internalSub = this.escucharCambiosMesas(5000).subscribe(data =>{
      //cada 5 segundos me devuelve la data 
      this.datos_mesas = data ;
    })
  }

      //Funcion que devuelve un Observable 
  escucharCambiosMesas(t:number){
      //retorno del Observable de mesas
  
    return new Observable<MesaModel[]>( observer =>{
      //configuro el intervale cadaa t segundos
      this.intervalo = setInterval(()=>{
      //ejecuto la consulta a FireBase 
        this._ms.obtenerMesas().subscribe(resp => {
          observer.next(resp); //Respondo con el observer a los que esten subscriptos
        })

      },t);
    } ) ;
  }
}
