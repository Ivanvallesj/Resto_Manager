import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../interfaces/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  DB_URL  = environment.DB_URL;
  DB_NODE = environment.DB_NODE;
  constructor(private http: HttpClient) { }

  crearCategoria(categoria : CategoriaModel){
    return this.http.post(`${this.DB_URL}${this.DB_NODE}/categorias.json`,categoria)
      .pipe(
        map((resp:any) => {
          categoria.id = resp.name;
          return categoria; //Retorno la categoria
        })
      )
  }


obtenerCategoria(){
  return this.http.get<CategoriaModel[]>(`${this.DB_URL}${this.DB_NODE}/categorias.json`)
    .pipe(map(this.arreglarObjeto))
}
obtenerCategoriaIndividual(id :any){
  return this.http.get<CategoriaModel>(`${this.DB_URL}${this.DB_NODE}/categorias/${id}.json`)
}


arreglarObjeto(objetoCategorias : any){
  if (objetoCategorias === null){return [];}
  
  const categorias : CategoriaModel[] = [];

  Object.keys(objetoCategorias).forEach(key => {
    const categoria : CategoriaModel = objetoCategorias[key];
    categoria.id = key;
    categorias.push(categoria);
  })

return categorias;

}
actualizarCategoria( categoria : CategoriaModel) {
  const cateTemp = {
    ...categoria
  }
  delete cateTemp.id;
  return this.http.put(`${this.DB_URL}${this.DB_NODE}/categorias/${categoria.id}.json`,cateTemp)
}
eliminarCategoria(categoria : CategoriaModel){
  return this.http.delete<CategoriaModel>(`${this.DB_URL}${this.DB_NODE}/categorias/${categoria.id}.json`)
  
}
}
