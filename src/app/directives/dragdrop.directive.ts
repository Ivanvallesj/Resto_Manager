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
    console.log(event);
    }


}
