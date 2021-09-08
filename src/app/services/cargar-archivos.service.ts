import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import{ArchivoModel} from '../models/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class CargarArchivosService {
  private carpetaImagenes = '/uploads';
  constructor() { firebase.default.initializeApp(environment.firebaseConfig) }
  cargarAFirebase(archivos : ArchivoModel[]){
    //subir los archivos a Firebase
    const referenciaAlmacenamiento = firebase.default.storage().ref();
//itero en cada archivo que vino por parametro
    for(const item of archivos){
      //marco que se esta subiendo por cada archivo
      item.estaSubiendo = true;
      //si ya llego a 100 el progreso continua
      if(item.progreso>=100){
        continue;
      }
      //creo la tarea de subida con la ruta donde va a estar mi archivo en Firebase
      const tareaDeSubida : firebase.default.storage.UploadTask=
          referenciaAlmacenamiento.child(`${this.carpetaImagenes}/${item.nombre}`)
          .put(item.archivo);
      //aca voy a escuchar si hay cambio de estado en la tarea
      tareaDeSubida.on(
        firebase.default.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes)*100},
        (error) => console.error("Error al subir",error),
        () =>{
          tareaDeSubida.snapshot.ref.getDownloadURL().then(data=>{
            item.url = data;
            item.estaSubiendo = false;
          }).catch(err => console.error("Error al devolver URL",err))
        }
      )
    }
    return archivos;
  }
}
