import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuModel } from 'src/app/interfaces/menu.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MenuService } from 'src/app/services/menu.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-menu',
  templateUrl: './ver-menu.component.html',
  styleUrls: ['./ver-menu.component.styl']
})
export class VerMenuComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();
  datos_menus! : MenuModel[];

  constructor(private restoService : RestoService, private rl:Router,private mnu : MenuService) { }

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })
    this.mnu.obtenerMenus().subscribe(resp=>{
      this.datos_menus = resp;
      console.log(resp);
            
    });

  }
  crearNuevoMenu(){
    this.rl.navigate(['admin-inicio/menu','nuevo']);
  }
  editarMenu(menu: MenuModel){
    this.rl.navigate(['admin-inicio/menu',menu.id]);
    
  }
  eliminarMenu (menu: MenuModel){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar este menú? ',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Borrar`,
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    this.mnu.eliminarMenu(menu).subscribe(resp=>{
    })
    const index = this.datos_menus.indexOf(menu)
    this.datos_menus.splice(index,1)
    Swal.close();
  } else if (result.isDenied){
    Swal.close();}
  })
  }
}
