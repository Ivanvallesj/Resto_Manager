import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/interfaces/categoria.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-categorias',
  templateUrl: './nueva-categorias.component.html',
  styleUrls: ['./nueva-categorias.component.styl']
})
export class NuevaCategoriasComponent implements OnInit {
  datos_restaurante : RestoData = new RestoData();
  mensaje : string = '';
  categoriaId : any | null = ''
  categoria : CategoriaModel = {
    nombre : ""
  }

  constructor(private restoService : RestoService, private rl : ActivatedRoute,private cateService : CategoriaService, private route : Router) { }

  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.categoriaId = this.rl.snapshot.paramMap.get('id')

    this.mensaje = (this.categoriaId === 'nueva') ? 'Nueva categoria' : 'Editar categoria';
    
    if(this.categoriaId !== 'nueva'){
      this.cateService.obtenerCategoriaIndividual(this.categoriaId).subscribe(resp =>{
        this.categoria = resp;
        this.categoria.id = this.categoriaId;
        
      })
    }

  }
  enviarFormulario(f : NgForm){
    if(f.invalid){
      Swal.fire("Error","Debe ingresar el nombre de la categoria","error")
      return;}

      //primero recupero los datos de las categorias existentes
    let tempCategorias : CategoriaModel[]=[];
    let yaExiste : boolean = false;
    this.cateService.obtenerCategoria().subscribe(resp =>{
      tempCategorias = resp;
      //ahora recorro los datos
      for (let cat of tempCategorias){
        if(cat.nombre.toLowerCase() === this.categoria.nombre.toLowerCase()){
          //si coincidieron es porque ya existe una categoria igual
          yaExiste = true;
          break;
        }
      }
      if(this.categoria.id){
        this.cateService.actualizarCategoria(this.categoria).subscribe(resp => {
          this.route.navigate(['admin-inicio/ver-categorias']);
        })
      } else{
              if (yaExiste === false){
              this.cateService.crearCategoria(this.categoria).subscribe(resp => {
              this.route.navigate(['admin-inicio/ver-categorias'])
              })
              } 
              else {
              Swal.fire("Error","Ya existe una categoria con ese nombre!","error");
              }
    }
    })
  }
}
