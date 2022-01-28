import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { CreateItemPageModule } from './create-item/create-item.module';
import { CreateSalepointPageModule } from './create-salepoint/create-salepoint.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    CreateSalepointPageModule,
    CreateItemPageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
