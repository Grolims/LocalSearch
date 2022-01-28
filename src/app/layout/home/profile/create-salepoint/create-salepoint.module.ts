import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSalepointPageRoutingModule } from './create-salepoint-routing.module';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CreateSalepointPage } from './create-salepoint.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSalepointPageRoutingModule,
    LeafletModule
  ],
  declarations: [CreateSalepointPage]
})
export class CreateSalepointPageModule {}
