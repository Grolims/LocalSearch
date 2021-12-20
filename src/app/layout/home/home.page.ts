import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: Item[] = [];
  constructor(private itemService: Itemservice) { }

  addItem() {
    this.itemService.getItem().subscribe(item => {
      this.items = item;
    });
   }

  ngOnInit() {
  }

}
