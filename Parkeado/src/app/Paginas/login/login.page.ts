import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  usuario: string = ''; // Variable usuario
  correo: string = ''; // Variable correo
  clave: string = ''; // Variable contraseña
  errors: string[] = []; // Array que almacena los mensajes de error
  emailInvalid: boolean = false; // Variable que valida el correo

  constructor(private router: Router) {}

  // Validar antes de navegar a home
  validadorDatos() {
    this.errors = []; // Limpiar errores anteriores
    this.emailInvalid = false; // Resetear estado de correo inválido

    // Validación para el nombre de usuario
    //if (this.usuario.trim() === '') {
    //  this.errors.push('Debe ingresar un nombre de Usuario.');
    //} else if (this.usuario.length < 3) { // Validación de longitud mínima para el nombre de usuario
    //  this.errors.push('El usuario debe tener al menos 3 caracteres.');
    //}

    // Validación para el correo
    if (this.correo.trim() === '') {
      this.errors.push('Debe ingresar un Correo electrónico.');
    } else if (!this.validarCorreo(this.correo)) {
      this.errors.push('El correo ingresado no es válido.');
      this.emailInvalid = true; // Marcar el estado del correo como inválido
    }

    // Validación para la contraseña
    if (this.clave.trim() === '') {
      this.errors.push('Debe ingresar una Contraseña.');
    } else if (this.clave.length < 6) {
      this.errors.push('La contraseña debe contener al menos 6 caracteres.');
    }

    // Si no hay errores, navega a home
    if (this.errors.length === 0) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          user: this.usuario, // Envío del dato del input Usuario
        },
      };
      this.router.navigate(['home'], navigationExtras); // Navega a "home" y envía el dato de Usuario
    }
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(correo); // Retorna true si el correo tiene un formato válido
  }

  ngOnInit() {}
}