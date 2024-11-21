import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor() { }

  onSubmit() {
    console.log('Formulario de registro enviado');
    // Aquí podrías agregar la lógica para enviar los datos al backend
  }

  ngOnInit() {
  }

}