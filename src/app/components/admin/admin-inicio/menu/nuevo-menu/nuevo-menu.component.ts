import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuModel } from 'src/app/interfaces/menu.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MenuService } from 'src/app/services/menu.service';
import { RestoService } from 'src/app/services/resto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaModel } from 'src/app/interfaces/categoria.model';
import { ArchivoModel } from 'src/app/models/archivo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.styl']
})
export class NuevoMenuComponent implements OnInit {
  
  datos_restaurante : RestoData = new RestoData();
  mensaje : string = '';
  menu : MenuModel = {
    nombre           : "" ,
    disponibilidad   : true,
    descripcion      : "" ,
    imagenUrl        : [] ,
    categoria        : "" ,
  }
  listaCategorias! : CategoriaModel[];
  menuId : any | null = '';

  constructor(private restoService : RestoService,private rl : ActivatedRoute, private menuService : MenuService, private route: Router,private catSer : CategoriaService) { }

  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })
    this.catSer.obtenerCategoria().subscribe(resp =>{
      this.listaCategorias = resp;
      
    })
    this.menuId = this.rl.snapshot.paramMap.get('id')

    this.mensaje = (this.menuId === 'nuevo') ? 'Nuevo Menu' : 'Editar Menu';
    
    if(this.menuId !== 'nuevo'){
      this.menuService.obtenerMenuIndividual(this.menuId).subscribe(resp => {
        this.menu = resp;
        this.menu.id = this.menuId
      })
    }
  }
  obtenerRespuestaDeArchivos(event : ArchivoModel[]){
    this.menu.imagenUrl=event;  
  }

  enviarFormulario(f : NgForm){

    if(f.invalid){ 
      Swal.fire('Error', 'Te faltan campos obligatorios', 'error')
      return; }

    if(this.menu.id){
      this.menuService.actualizarMenu(this.menu).subscribe(resp => {
        this.irAmenu();
      })
    }else{
      this.menuService.crearMenu(this.menu).subscribe(resp => {
        this.irAmenu();
      })    
    }

  }
  private irAmenu(){
    this.route.navigate(['admin-inicio/ver-menu'])
  }

}