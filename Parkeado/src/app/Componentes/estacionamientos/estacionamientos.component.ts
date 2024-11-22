import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estacionamientos',
  templateUrl: './estacionamientos.component.html',
  styleUrls: ['./estacionamientos.component.scss'],
})
export class EstacionamientosComponent  implements OnInit {

  properties = [
    { name: 'Departamento', location: 'Las Condes', price: 2500 },
    { name: 'Casa', location: 'Puente Alto', price: 1800 },
    { name: 'Oficina', location: 'Santiago Centro', price: 1300 }
  ];

  constructor() { }

  ngOnInit() {}

}