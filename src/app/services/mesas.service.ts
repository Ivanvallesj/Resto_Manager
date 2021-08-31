import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MesaModel } from '../interfaces/mesa.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MesasService {

  DB_URL  = environment.DB_URL;
  DB_NODE = environment.DB_NODE;

  constructor(private http: HttpClient) { }


  crearMesa(mesa : MesaModel){
    return this.http.post(`${this.DB_URL}${this.DB_NODE}/mesas.json`,mesa)
      .pipe(
        map((resp:any) => {
          mesa.id = resp.name;
          return mesa; //Retorno la mesa
        })
      )
  }
  obtenerMesas(){
    return this.http.get<MesaModel[]>(`${this.DB_URL}${this.DB_NODE}/mesas.json`)
      .pipe(map(this.arreglarObjeto))
  }
  obtenerMesaIndividual(id :any){
    return this.http.get<MesaModel>(`${this.DB_URL}${this.DB_NODE}/mesas/${id}.json`)
  }


  arreglarObjeto(objetoMesas : any){
    if (objetoMesas === null){return [];}
    
    const mesas : MesaModel[] = [];

    Object.keys(objetoMesas).forEach(key => {
      const mesa : MesaModel = objetoMesas[key];
      mesa.id = key;
      mesas.push(mesa);
    })

  return mesas;

  }
  actualizarMesa( mesa : MesaModel) {
    const mesaTemp = {
      ...mesa
    }
    delete mesaTemp.id;
    return this.http.put(`${this.DB_URL}${this.DB_NODE}/mesas/${mesa.id}.json`,mesaTemp)
  }
  eliminarMesa(mesa : MesaModel){
    return this.http.delete<MesaModel>(`${this.DB_URL}${this.DB_NODE}/mesas/${mesa.id}.json`)
    
  }
}
