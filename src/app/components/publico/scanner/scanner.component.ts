import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.styl']
})
export class ScannerComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  scanTable(){
    this.router.navigateByUrl('/inicio/bienvenida/cu8sl9qmjbSTeQVw2Ip38LccqQq1/-MihqHhST52sZT3xgWDt')
  }

}
