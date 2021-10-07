import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuModel } from 'src/app/interfaces/menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-ver-plato',
  templateUrl: './ver-plato.component.html',
  styleUrls: ['./ver-plato.component.styl']
})
export class VerPlatoComponent implements OnInit {

  menuId!: string;
  menu! : MenuModel;
  cargando : boolean = true;

  constructor(private _ms:MenuService, private _ar:ActivatedRoute) { 

    this._ar.params.subscribe(params => {
      this.menuId = params['id'];
    })

  }

  ngOnInit(): void {

    this._ms.obtenerMenuIndividual(this.menuId).subscribe(respuesta =>{
      this.menu = respuesta;
      this.cargando = false
    })

  }

}
