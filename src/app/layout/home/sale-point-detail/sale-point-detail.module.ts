import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { SalePointDetailPageRoutingModule } from './sale-point-detail-routing.module';

import { SalePointDetailPage } from './sale-point-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalePointDetailPageRoutingModule
  ],
  declarations: [SalePointDetailPage],

})
export class SalePointDetailPageModule {}
