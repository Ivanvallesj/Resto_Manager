import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { MenuModel } from 'src/app/interfaces/menu.model';

@Component({
  selector: 'app-ver-menu-categoria',
  templateUrl: './ver-menu-categoria.component.html',
  styleUrls: ['./ver-menu-categoria.component.styl']
})
export class VerMenuCategoriaComponent implements OnInit {

  parametroCategoria!: string;
  menu: MenuModel[] = [];

  constructor( private _ar: ActivatedRoute, private _ms: MenuService ) {

    this._ar.params.subscribe(parametros => {
      this.parametroCategoria = parametros['id'];
    })

  }

  ngOnInit(): void {

    this._ms.obtenerMenus().subscribe(resp => {
      resp.forEach(elementoDeMenu => {
        if(elementoDeMenu.categoria.toLowerCase() === this.parametroCategoria.toLowerCase()){
          this.menu.push(elementoDeMenu);
        }
      })
    })

  }

}
