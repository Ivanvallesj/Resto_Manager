import { ArchivoModel } from "../models/archivo.model";

export interface MenuModel {
    id?              : string;
    nombre           : string   ;
    cantPersonas?    : string   ;
    valor?           : number;
    disponibilidad   : boolean  ;
    descripcion      : string   ;
    imagenUrl        : ArchivoModel[]   ;
    categoria        : string   ;
}