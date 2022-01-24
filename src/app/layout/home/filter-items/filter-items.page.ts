import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { ItemResponseValue } from 'src/app/models/item';

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.page.html',
  styleUrls: ['./filter-items.page.scss'],
})
export class FilterItemsPage implements OnInit {
  items:ItemResponseValue[] = [];
  constructor(private itemService: Itemservice) { }

  ngOnInit() {

    this.addItem();

  }


  addItem() {

    this.itemService.getItem().subscribe(item => {
      item.data.forEach(element => {
        this.items.push(element);
        console.log(this.items[0].name)
      });


    });
   }

}
