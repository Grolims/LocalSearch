import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { CreateItemPageModule } from 'src/app/layout/home/profile/create-item/create-item.module';
import { CreateSalepointPageModule } from 'src/app/layout/home/profile/create-salepoint/create-salepoint.module';
import { ItemDetailPageModule } from '../item-detail/item-detail.module';
import { ItemDetailPageRoutingModule } from '../item-detail/item-detail-routing.module';
import { UpdateItemsPageModule } from './update-items/update-items.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    CreateSalepointPageModule,
    CreateItemPageModule,
    ItemDetailPageRoutingModule,
    ItemDetailPageModule,
    CreateItemPageModule,
    UpdateItemsPageModule,

  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
