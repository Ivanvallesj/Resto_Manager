import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArchivoModel } from 'src/app/models/archivo.model';
import { CargarArchivosService } from 'src/app/services/cargar-archivos.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.styl']
})
export class UploaderComponent implements OnInit {

  estaSobreDrop : boolean = false;
  archivos : ArchivoModel[]=[];

  @Output() emisorDeArchivos : EventEmitter<ArchivoModel[]> = new EventEmitter();

  constructor(private _cs : CargarArchivosService) { }

  ngOnInit(): void {
  }

  cargarImagenesAFirebase(){
    this.archivos = this._cs.cargarAFirebase(this.archivos)
    this.emisorDeArchivos.emit(this.archivos)
  }
}
