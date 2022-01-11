import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Itemservice } from 'src/app/services/item.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-salepoint',
  templateUrl: './create-salepoint.page.html',
  styleUrls: ['./create-salepoint.page.scss'],
})
export class CreateSalepointPage implements OnInit {

  constructor(public httpClient: HttpClient) { }

  public paymentMethods = [
    { val: "Card"},
    { val: "Twint"},
    { val: "Cash"},
  ];

  salepoints:SalepointResponseValue = {
    location: {
      type: null,
      coordinates: [null,null]
    },
    _id: null,
    address: null,
    picture:null,
    paymentMethod: null,
    userId: null,
    creationDate: null,
  };
  postError: boolean;

  createSalepoint(form: NgForm){

    if (form.invalid) {
      return;
    }

    console.log(this.salepoints)
    this.httpClient.post("https://localsearch-ch.herokuapp.com/salepoints", this.salepoints)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);
    });

  }


  ngOnInit() {
  }

}
