import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Itemservice } from './services/item.service';

import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  items: Item[];
  constructor(storage: Storage, private itemService: Itemservice) {
    storage.create();
  }

}

