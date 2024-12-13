import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';  
import { ActivatedRoute } from '@angular/router'; //Librería para recibir parámetros de la URL

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  //receivedUsername!: string; // Recibe el nombre de usuario
  comuna: string = '';  // Para almacenar la comuna seleccionada
  fechaHora: string = '';  // Para almacenar la fecha y hora seleccionada

  constructor(private route: ActivatedRoute, private alertController: AlertController, private navCtrl: NavController) {}

  ngOnInit() {
    // Obtener la fecha y hora actuales
    const currentDate = new Date();
    
    // Formatear la fecha en el formato adecuado para ion-datetime (fecha actual en formato ISO)
    this.fechaHora = currentDate.toISOString();  // La fecha actual en formato ISO 8601

    // Obtener el parámetro del nombre de usuario desde la URL
    //this.route.queryParams.subscribe(params => {
    //  this.receivedUsername = params['user']; // Almacena lo recibido desde Login
    //});
  }

  // Método para formatear la fecha y hora en el formato de Chile (día, mes, hora)
  formatDateForChile(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',  // Día de la semana (lunes, martes...)
      day: '2-digit',   // Día del mes (01, 02, 03...)
      month: 'long',    // Mes (enero, febrero, ...)
      year: 'numeric',  // Año (2024)
      hour: '2-digit',  // Hora (24 horas)
      minute: '2-digit', // Minuto (00, 01, ...)
      timeZone: 'America/Santiago', // Zona horaria de Chile
    };

    const formatter = new Intl.DateTimeFormat('es-CL', options);
    return formatter.format(date);  // Devuelve la fecha formateada
  }

  // Método que se ejecuta cuando el usuario hace clic en "Reservar"
  async onSubmit() {
    console.log('Botón "RESERVAR" presionado');
    
    // Verifica si ambos campos (comuna y fechaHora) están llenos
    if (this.comuna && this.fechaHora) {
      // Si ambos campos están llenos, muestra el mensaje de confirmación
      console.log('Reserva realizada para la comuna:', this.comuna);
      console.log('Fecha y hora seleccionada:', this.fechaHora);

      // Formatear la fecha en el formato adecuado
      const formattedDate = this.formatDateForChile(new Date(this.fechaHora));

      // Llamada para mostrar el mensaje de confirmación
      const alert = await this.alertController.create({
        header: 'Reserva exitosa!',
        message: `Comuna de ${this.comuna} para el día ${formattedDate}.`,
        buttons: ['OK']
      });

      await alert.present();  // Presenta el mensaje de alerta
      
    } else {
      // Si falta alguno de los campos, muestra un mensaje de advertencia
      console.log('Por favor, complete todos los campos.');
      
      const alert = await this.alertController.create({
        header: 'Atención!',
        message: 'Debes seleccionar una comuna, el día y la hora donde quieres estacionar.',
        buttons: ['OK']
      });

      await alert.present();  // Presenta el mensaje de alerta de error
    }
  }
}
