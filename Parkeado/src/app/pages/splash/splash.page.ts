import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; //importar el modulo Router

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
//Modificar el constructor o función para iniciar la page login
// cuando finalice la animación de la page splash
  constructor(public router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl('auth')
   }, 2000);//duración 3 segundos
  }

  ngOnInit() {
  }
}
