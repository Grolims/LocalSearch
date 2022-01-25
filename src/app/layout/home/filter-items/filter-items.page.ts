import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { ItemResponseValue } from 'src/app/models/item';
import { NgForm } from "@angular/forms";
import { NavparamService } from 'src/app/navparam.service';

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.page.html',
  styleUrls: ['./filter-items.page.scss'],
})
export class FilterItemsPage implements OnInit {


  constructor(private itemService: Itemservice,private navParamService:NavparamService) { }

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






  changeValue(event: any)
  {
    console.log(event.detail)
  }

  save()
  {
    console.log(this.types);
    this.navParamService.setNavData(this.types)
  }

}
