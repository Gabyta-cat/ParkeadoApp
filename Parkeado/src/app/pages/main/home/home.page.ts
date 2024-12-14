import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.module';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateComponent } from 'src/app/shared/components/add-update/add-update.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }
  
  ionViewWillEnter() {
    this.getProducts();
  }

  //Obtener estacionamientos
  getProducts() {
    let path = `users/${this.user().uid}/products`;

    let sub = this.firebaseSvc.getColletionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        sub.unsubscribe();
      }
    })
  }

  //Agregar o actualizar producto
  async addUpdate(product?: Product) {

    let success = await this.utilsSvc.presentModal({
      component: AddUpdateComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })

    if (success) this.getProducts();
  }

  //Confirma la eliminación del producto
  async confirmDeleteProduct(product: Product) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Estacionamiento',
      message: '¿Quieres eliminar este estacionamiento?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProduct(product)
          }
        }
      ]
    });

  }


  //*********** Eliminar *******************
  async deleteProduct(product: Product) {

    let path = `users/${this.user().uid}/products/${product.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.products = this.products.filter(p => p.id !== product.id);

      this.utilsSvc.presentToast({
        message: 'Estacionamiento eliminado',
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
