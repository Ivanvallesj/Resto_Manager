import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestoData } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  DB_URL  = environment.DB_URL;
  DB_NODE = environment.DB_NODE;

  constructor(private http: HttpClient) { }

  obtenerRestaurant(){
      return this.http.get<RestoData>(`${this.DB_URL}${this.DB_NODE}.json`)
  }

}
