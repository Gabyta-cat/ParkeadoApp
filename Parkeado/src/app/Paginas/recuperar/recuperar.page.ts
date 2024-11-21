import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  correo: string = ''; // Variable correo
  errors: string[] = []; // Array que almacena los mensajes de error
  emailInvalid: boolean = false; // Variable que maneja la validez del correo

  constructor(private router: Router) {}

  validaDato() {
    this.errors = []; // Limpiar errores anteriores
    this.emailInvalid = false; // Resetear estado de correo inválido

    // Validación para el correo
    if (this.correo.trim() === '') {
      this.errors.push('Debe ingresar un Correo electrónico.');
    } else if (!this.validarCorreo(this.correo)) {
      this.errors.push('El correo ingresado no es válido.');
      this.emailInvalid = true; // Marcar correo como inválido
    }

    // Si no hay errores, navega a home
    if (this.errors.length === 0) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          email: this.correo,  // Envío del dato del input Correo
        },
      };
      this.router.navigate(['login'], navigationExtras);  // Redirigir a la página de login
    } else {
      // Si hay errores, mostramos un mensaje (puedes hacer esto con un Toast o una alerta)
      console.log('Errores encontrados:', this.errors);
    }
  }

  // Método para validar el formato del correo
  validarCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(correo);  // Retorna true si el correo tiene un formato válido
  }

  ngOnInit() {}
}