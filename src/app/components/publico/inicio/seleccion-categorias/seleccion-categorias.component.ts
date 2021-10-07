import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaModel } from 'src/app/interfaces/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-seleccion-categorias',
  templateUrl: './seleccion-categorias.component.html',
  styleUrls: ['./seleccion-categorias.component.styl']

})
export class SeleccionCategoriasComponent implements OnInit {

  
  categorias: CategoriaModel[] = [];

  constructor(private _cs: CategoriaService, private _r:Router) {}

  ngOnInit(): void {
    this._cs.obtenerCategoria().subscribe(resp => {
      this.categorias = resp;
    })
  }

  verCategoriaMenu(categ:string){
    this._r.navigate(['inicio/categoria-menu',categ.toLowerCase()])
  }

}
