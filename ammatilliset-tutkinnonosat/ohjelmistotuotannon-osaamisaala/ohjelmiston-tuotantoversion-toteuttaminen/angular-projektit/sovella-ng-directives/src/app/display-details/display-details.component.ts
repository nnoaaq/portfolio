import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-details',
  templateUrl: './display-details.component.html',
  styleUrls: ['./display-details.component.css']
})
export class DisplayDetailsComponent implements OnInit {
  piilotettu: boolean = false;
  piilotettuAika: boolean = false;
  loki = [];
  lokiAika = [];
  i: number = 0;
  aika : string = new Date().toDateString();
 
   piilotus() {
    this.piilotettu = ! this.piilotettu;
    this.i++;
    this.loki.push(this.i)
  }
   piilotusAika() {

    this.piilotettuAika = ! this.piilotettuAika;
    this.lokiAika.push(new Date());
  }
  constructor() {
  }
  ngOnInit(): void {
  }

}
