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
    this.router.navigateByUrl('/inicio/wkEFIiEVyJ7vSfP7H0NG/1')
  }

}
