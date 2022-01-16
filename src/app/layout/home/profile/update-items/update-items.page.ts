import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NavparamService } from 'src/app/navparam.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.page.html',
  styleUrls: ['./update-items.page.scss'],
})
export class UpdateItemsPage implements OnInit {


  data:any = 0;


  constructor(public httpClient: HttpClient, private itemService: Itemservice, private authservice: AuthService, private activatedRoute: ActivatedRoute, private navParamService:NavparamService) {

    this.data = this.navParamService.getNavData();
    console.log(this.data.name);

  }

   public types = [
    { val: 'Fruit'},
    { val: 'Viande'},
    { val: 'Légumes'},
    { val: 'Céréales'},
    { val: 'Boissons'},
    { val: 'Autre'}
  ];

  public labels = [
    { val: "Bio"},
    { val: "Vegan"},
  ];


  postOK:boolean;


  updateItems(form: NgForm)
  {
    if (form.invalid) {
      return;
    }
      console.log(this.data.name);
    this.httpClient.patch("https://localsearch-ch.herokuapp.com/items/"+this.data._id, this.data)
    .subscribe(data => {

      console.log(data);
     }, error => {
      console.warn(`Post failed: ${error.message}`);
      console.log(error);
    });

    this.postOK = true;
  }

  ngOnInit() {
  }

}



