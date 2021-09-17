import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.styl']
})
export class BienvenidaComponent implements OnInit {

  private restoId : string = '';
  private mesaId : string = '';
  private datos_resto! : RestoData;

  constructor( private activatedRoute : ActivatedRoute, private _rs: RestoService ) {
    //Recupero parametros
    this.activatedRoute.params.subscribe(params => {
      this.restoId = params.idResto;
      this.mesaId  = params.idMesa;
    })
    //Recupero datos del restaurant
    this._rs.public_obtenerRestaurant(this.restoId).subscribe(rd => {
      this.datos_resto = rd;
      console.log(this.datos_resto);
    })
    //Recupero datos de la mesa


  }

  ngOnInit(): void {
  }

}
