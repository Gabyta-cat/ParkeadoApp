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

  user(): User{
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

    if(success) this.getProducts();
  }

}
