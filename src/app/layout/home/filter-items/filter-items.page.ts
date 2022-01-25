import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { ItemResponseValue } from 'src/app/models/item';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.page.html',
  styleUrls: ['./filter-items.page.scss'],
})
export class FilterItemsPage implements OnInit {


  constructor(private itemService: Itemservice) { }

  ngOnInit() {

  }

  public types = [
    { val: 'Fruit', isChecked: true },
    { val: 'Viande', isChecked: false },
    { val: 'Légumes', isChecked: false },
    { val: 'Céréales', isChecked: false },
    { val: 'Boissons', isChecked: false },
    { val: 'Autre', isChecked: false }
  ];

  items:ItemResponseValue = {

    name: null,
    type: null,
    description: null,
    picture:null,
    label: null,
    price:null,
    userId:null,
    salepointId: null,

  };


  save()
  {
    console.log(this.types);
  }

}
