import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
})
export class AddUpdateComponent implements OnInit {

  @Input() product: Product

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl(''), // El campo de imagen es solo para almacenar temporalmente la imagen en la UI
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl('', [Validators.required, Validators.minLength(4)]),
    place: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    hours: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user = {} as User;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.product) this.form.setValue(this.product);
  }

  // Tomar o seleccionar una imagen
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del estacionamiento')).dataUrl;
    this.form.controls.image.setValue(dataUrl); // Almacena la imagen (temporalmente)
  }

  submit(){
    if (this.form.valid){
      if (this.product) this.updateProduct();
      else this.createProduct()
    }
  }  

  
  async createProduct() {
      let path = `users/${this.user.uid}/products`;

      // Crear un objeto de datos a enviar sin la imagen
      const productData = { ...this.form.value };

      // Eliminar la imagen del objeto antes de enviarlo a Firebase
      delete productData.image;

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.addDocument(path, productData).then(async (res) => {
        this.utilsSvc.dismissModal({ success: true });

        this.utilsSvc.presentToast({
          message: 'Estacionamiento Agregado',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline',
        });
      }).catch((error) => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
  }

  async updateProduct() {
      let path = `users/${this.user.uid}/products/${this.product.id}`;

      // Crear un objeto de datos a enviar sin la imagen
      const productData = { ...this.form.value };

      // Eliminar la imagen del objeto antes de enviarlo a Firebase
      delete productData.image;

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.addDocument(path, productData).then(async (res) => {
        this.utilsSvc.dismissModal({ success: true });

        this.utilsSvc.presentToast({
          message: 'Estacionamiento actualizado',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline',
        });
      }).catch((error) => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
  }
}
