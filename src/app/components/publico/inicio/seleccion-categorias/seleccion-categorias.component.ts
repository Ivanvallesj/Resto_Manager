import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/interfaces/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-seleccion-categorias',
  templateUrl: './seleccion-categorias.component.html',
  styleUrls: ['./seleccion-categorias.component.styl']
})
export class SeleccionCategoriasComponent implements OnInit {

  datos_categoria! : CategoriaModel[];
  
  constructor(private catServices : CategoriaService) { }


  ngOnInit(): void {
    this.catServices.obtenerCategoria().subscribe(resp=>{
      this.datos_categoria = resp;
    })
  }

}
