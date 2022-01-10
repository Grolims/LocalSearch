import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Itemservice } from './services/item.service';
import { Salepointservice } from './services/salepoint.service';

import { ItemResponse } from './models/item';

import { SalepointResponse } from './models/salepoint';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  items: ItemResponse[];
  salepoints: SalepointResponse[];
  constructor(storage: Storage, private itemService: Itemservice, private salepointService: Salepointservice) {
    storage.create();
  }

}

