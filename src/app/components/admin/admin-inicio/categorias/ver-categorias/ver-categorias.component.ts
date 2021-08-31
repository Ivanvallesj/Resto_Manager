import { Component, OnInit } from '@angular/core';
import { RestoService } from 'src/app/services/resto.service';
import { RestoData } from 'src/app/models/restaurant.model';
import { Router } from '@angular/router';
import { CategoriaModel } from 'src/app/interfaces/categoria.model';
import Swal from 'sweetalert2'
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-ver-categorias',
  templateUrl: './ver-categorias.component.html',
  styleUrls: ['./ver-categorias.component.styl']
})
export class VerCategoriasComponent implements OnInit {
  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();
  datos_categoria! : CategoriaModel[];

  constructor(private restoService : RestoService, private rl : Router,private  cat : CategoriaService) { }

  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    });
    this.cat.obtenerCategoria().subscribe(resp=>{
      this.datos_categoria = resp;          
    });
  }
  crearNuevaCategoria(){
    this.rl.navigate(['admin-inicio/categorias','nueva']);
  }
  editarCategoria(categoria: CategoriaModel){
    this.rl.navigate(['admin-inicio/categorias',categoria.id]);
    
  }
  eliminarCategoria (categoria: CategoriaModel){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar esta categoria? ',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Borrar`,
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      this.cat.eliminarCategoria(categoria).subscribe(resp=>{
        })
      const index = this.datos_categoria.indexOf(categoria)
      this.datos_categoria.splice(index,1)
      Swal.close();
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }

}
