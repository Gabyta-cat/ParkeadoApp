import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrendadorPageRoutingModule } from './arrendador-routing.module';

import { ArrendadorPage } from './arrendador.page';
import { EstacionamientosComponent} from 'src/app/Componentes/estacionamientos/estacionamientos.component';
import { PagosComponent } from 'src/app/Componentes/pagos/pagos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrendadorPageRoutingModule
  ],
  declarations: [ArrendadorPage,
    EstacionamientosComponent,
    PagosComponent
  ]

})
export class ArrendadorPageModule {}
