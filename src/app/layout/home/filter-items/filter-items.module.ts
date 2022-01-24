import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterItemsPageRoutingModule } from './filter-items-routing.module';

import { FilterItemsPage } from './filter-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterItemsPageRoutingModule
  ],
  declarations: [FilterItemsPage]
})
export class FilterItemsPageModule {}
