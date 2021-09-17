import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.styl']
})
export class CerrarSesionComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();

  constructor(private restoService : RestoService, private router: Router, private authService : AuthService ) { }

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

  }

  cerrarSesion(){
    Swal.fire({
      title : "Cerrar sesion",
      text  : "Estas Seguro que decea cerra sesion",
      icon  : "warning",
      showConfirmButton : true,
      showCancelButton  : true,
      confirmButtonText : "si",
      cancelButtonText  : "no"
    }).then(respuesta =>{
      if(respuesta.isConfirmed){
        this.authService.logOut();
        this.router.navigate(['admin-iniciarsesion'])
      }else{
        Swal.close();
      }
    })
  }

}
