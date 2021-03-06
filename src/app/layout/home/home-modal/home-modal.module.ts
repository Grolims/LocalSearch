import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeModalPageRoutingModule } from './home-modal-routing.module';

import { HomeModalPage } from './home-modal.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateSalepointPageModule } from '../profile/create-salepoint/create-salepoint.module';
import { ItemDetailPageModule } from '../item-detail/item-detail.module';
import { ProfilePageModule } from '../profile/profile.module';
import { SalePointDetailPageModule } from '../sale-point-detail/sale-point-detail.module';
import { DataService } from 'src/app/services/data.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeModalPageRoutingModule,
    LeafletModule,
    Ng2SearchPipeModule,
    SalePointDetailPageModule,
    ItemDetailPageModule,
    CreateSalepointPageModule,
    ProfilePageModule,
  ],
  declarations: [HomeModalPage],
  providers: [DataService]

})
export class HomeModalPageModule {}
