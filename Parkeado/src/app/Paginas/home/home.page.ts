import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; 
import { ActivatedRoute } from '@angular/router'; //Librería para recibir parámetros de la URL

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  receivedUsername!: string; // Recibe el nombre de usuario

  constructor(private route: ActivatedRoute, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    // Obtener el parámetro del nombre de usuario desde la URL
    this.route.queryParams.subscribe(params => {
      this.receivedUsername = params['user']; // Almacena lo recibido desde Login
    });
  }

}
