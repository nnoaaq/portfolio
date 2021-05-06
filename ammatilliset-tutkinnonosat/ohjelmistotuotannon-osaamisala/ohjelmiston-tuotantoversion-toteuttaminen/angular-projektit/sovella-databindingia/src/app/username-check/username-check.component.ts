import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-username-check',
  templateUrl: './username-check.component.html',
  styleUrls: ['./username-check.component.css']
})
export class UsernameCheckComponent implements OnInit {
  name = 'Oletusteksti';
  eiaktiivinen: boolean = false;
  constructor() {
   
  }
  omaFunktio() {
    this.name = "";
}
  ngOnInit(): void {
  }

}
