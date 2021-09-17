import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.styl']
})
export class InicioComponent implements OnInit {

  private restoId : string = "";
  private mesaId : string = "";
  private datos_resto! : RestoData;

  constructor(private activateRoute: ActivatedRoute, private rs : RestoService) { 
    //Recupero parametros
  this.activateRoute.params.subscribe(params=>{
      this.restoId = params.idResto;
      this.mesaId  = params.idMesa;
  
})
//recupero datos del restaurante
  this.rs.public_obtenerRestaurant(this.restoId).subscribe(rd=>{
    this.datos_resto = rd;
    console.log(this.datos_resto)
      })
  //Recupero datos de la mesa


  }
  
  ngOnInit() {    
  }

}
