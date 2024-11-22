import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent  implements OnInit {

  payments = [
    { date: '2024-11-01', amount: 4500 },
    { date: '2024-10-31', amount: 5000 },
    { date: '2024-09-18', amount: 12000 }
  ];

  constructor() { }

  ngOnInit() {}

}
