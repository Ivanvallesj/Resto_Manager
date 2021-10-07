import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flecha-navegacion',
  templateUrl: './flecha-navegacion.component.html',
  styleUrls: ['./flecha-navegacion.component.styl']
})
export class FlechaNavegacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  volverAtras(){
    window.history.back();
  }

}
