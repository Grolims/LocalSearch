import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ItemDetailPageModule } from './item-detail/item-detail.module';
import { HomeModalPageModule } from './home-modal/home-modal.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LeafletModule,
    Ng2SearchPipeModule,
    ItemDetailPageModule,
    HomeModalPageModule,

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
