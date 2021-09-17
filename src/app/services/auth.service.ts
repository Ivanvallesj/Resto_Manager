import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  private API_KEY = 'AIzaSyDVqOQtZqHsrxqxp3AqF1AZOWHF9Cpr7u4'

  userToken! : string;

  constructor( private http : HttpClient ) { 
    this.getToken();
  }

  login(usuario: UsuarioModel){
    
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.URL_API}signInWithPassword?key=${this.API_KEY}`,
      authData
    ).pipe(
      map( (resp:any) => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
    
  }

  private saveToken( idToken : string) {
    this.userToken = idToken;
    localStorage.setItem('token',idToken);
  }

  private getToken(){
    if(localStorage.getItem('token')){
      this.userToken = String(localStorage.getItem('token'))
    }else{
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado() : boolean {
    return this.userToken.length > 20;
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('uid_hash');
  }
  
}
