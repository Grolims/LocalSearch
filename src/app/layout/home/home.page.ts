import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { ItemResponse } from 'src/app/models/item';
import { ItemResponseValue } from 'src/app/models/item';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items:ItemResponseValue[] = [];
  constructor(private itemService: Itemservice) { }

  addItem() {

    this.itemService.getItem().subscribe(item => {
      item.data.forEach(element => {
        this.items.push(element);
      });


    });
   }

  ngOnInit() {
  }

}
