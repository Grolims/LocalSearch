import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSalepointPage } from './create-salepoint.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSalepointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSalepointPageRoutingModule {}
