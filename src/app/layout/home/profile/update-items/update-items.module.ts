import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateItemsPageRoutingModule } from 'src/app/layout/home/profile/update-items/update-items-routing.module';

import { UpdateItemsPage } from 'src/app/Layout/home/profile/update-items/update-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateItemsPageRoutingModule
  ],
  declarations: [UpdateItemsPage]
})
export class UpdateItemsPageModule {}
