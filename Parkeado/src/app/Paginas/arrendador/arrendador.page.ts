import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arrendador',
  templateUrl: './arrendador.page.html',
  styleUrls: ['./arrendador.page.scss'],
})
export class ArrendadorPage implements OnInit {
  selectedSegment: string = 'estacionamientos';  // Valor inicial
  constructor(private route: ActivatedRoute) {}

  onSegmentChange(event: any) {
    console.log('Segment changed:', event.detail.value);
    this.selectedSegment = event.detail.value;  // Actualizar el valor de `selectedSegment`
  }

  ngOnInit() {
  }

}