import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  usuario : UsuarioModel = new UsuarioModel();
  recuerdame : boolean = false;

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = String(localStorage.getItem('email'))
      this.recuerdame = true
    }
  }

  login(form : NgForm) {

    //imprimir si el formulario es válido
    if( form.invalid ){ return; }

    Swal.fire('Ingresando','Espere por favor...','info');
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe((data) => {
      Swal.close();

      localStorage.setItem('uid_hash',data.localId);

      if(this.recuerdame == true){
        localStorage.setItem('email',this.usuario.email)
      }else{
        if (localStorage.getItem('email')){
          localStorage.removeItem('email')
        }
      }

      this.router.navigateByUrl('/admin-inicio');
    }, err => {
      Swal.close();
      switch (err.error.error.message) {
        case 'INVALID_PASSWORD':
          Swal.fire('Error','La contraseña no es válida','error');
          break;
        case 'EMAIL_NOT_FOUND':
          Swal.fire('Error','El correo no pertenece a un usuario','error');
          break;
        default:
          console.log(err);          
          break;
      }
    })

  }

}
