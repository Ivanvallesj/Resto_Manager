import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuModel } from '../interfaces/menu.model';
import { environment } from 'src/environments/environment';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  DB_URL  = environment.DB_URL;
  DB_NODE = environment.DB_NODE;

  constructor(private http: HttpClient) { }
  crearMenu(menu : MenuModel){
    return this.http.post(`${this.DB_URL}${this.DB_NODE}/menu.json`, menu)
      .pipe(
        map((resp:any) => {
          menu.id = resp.name;
          return menu; //Retorno la menu
        })
      )  
  }
  obtenerMenuIndividual(id:any){
    return this.http.get<MenuModel>(`${this.DB_URL}${this.DB_NODE}/menu/${id}.json`)
  }
  actualizarMenu( menu : MenuModel) {
    
    const menuTemp = {
      ...menu
    }
    delete menuTemp.id;

    return this.http.put(`${this.DB_URL}${this.DB_NODE}/menu/${menu.id}.json`,menuTemp)
  }
  obtenerMenus(){
    return this.http.get<MenuModel[]>(`${this.DB_URL}${this.DB_NODE}/menu.json`)
      .pipe(map(this.arreglarObjeto))
  }
  arreglarObjeto(objetoMenu : any){
    if (objetoMenu === null){return [];}
    
    const menus : MenuModel[] = [];

    Object.keys(objetoMenu).forEach(key => {
      const menu : MenuModel = objetoMenu[key];
      menu.id = key;
      menus.push(menu);
    })

  return menus;

  }
  eliminarMenu(menu : MenuModel){
    return this.http.delete<MenuModel>(`${this.DB_URL}${this.DB_NODE}/menu/${menu.id}.json`)
    
  }
}