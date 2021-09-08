import { Directive, 
        HostListener,
        EventEmitter, 
        Output, 
        Input } from '@angular/core';

import {ArchivoModel} from '../models/archivo.model'
@Directive({
  selector: '[NgDragQueen]'
})
export class DragdropDirective {

  @Input() archivosDropeados : ArchivoModel[]=[];
  @Output() emisorDePosicion : EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover',['$event'])
  public mouseOver( event : any ){
    //esta funcion se ejectuta cuando el mouse pasa por arriba con algo agarrado
    this._prevenirDetener(event);
    this.emisorDePosicion.emit(true);
    }

  @HostListener('dragleave',['$event'])
  public mouseOut( event : any ){
    //esta funcion se ejectuta cuando el mouse pasa por arriba con algo agarrado
    this.emisorDePosicion.emit(false);
    }

  @HostListener('drop',['$event'])
  public onDrop( event : any ){
    const transferencia = this._obtenerDatosDropeados(event) ;
    if (!transferencia) {return};

    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.emisorDePosicion.emit(false);

    }

//FUNCIONES
private _extraerArchivos(listaDeArchivos : FileList){
  for (const propiedad in Object.getOwnPropertyNames(listaDeArchivos)){
    const archivoTemporal = listaDeArchivos[propiedad]
    if (this._puedeCargarse(archivoTemporal)){
      const nuevoArchivo = new ArchivoModel(archivoTemporal);
      this.archivosDropeados.push(nuevoArchivo);
    }
  }
}

private _obtenerDatosDropeados(event : any){
  return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
}
    


//VALIDACIONES
//Prevenir que se abra la imagen por dedault cuando hace el drop
    private _prevenirDetener(event : any){
      event.preventDefault();
      event.stopPropagation();
    }

    private _archivoYaDropeado (nombreArchivo : string) : boolean{
      for (const archivo of this.archivosDropeados){
        if (archivo.nombre == nombreArchivo){
          console.log("El archivo ya esta agregado");
          return true; 
        }
      }
      return false;
    }

    private _esImagen(tipoArchivo:string ): boolean{
      return (tipoArchivo === "" || tipoArchivo===undefined)? false : tipoArchivo.startsWith('image');
    }

    private _puedeCargarse(archivo : File): boolean{
      return (!this._archivoYaDropeado(archivo.name) && this._esImagen(archivo.type));
    }

}
