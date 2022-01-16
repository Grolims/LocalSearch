import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Itemservice } from 'src/app/services/item.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-salepoint',
  templateUrl: './create-salepoint.page.html',
  styleUrls: ['./create-salepoint.page.scss'],
})
export class CreateSalepointPage implements OnInit {

  constructor(public httpClient: HttpClient, private authservice: AuthService) {

    this.authservice.getUser$().subscribe(user=> this.salepoints.userId = user._id)
  }

  public paymentMethods = [
    { val: "Card"},
    { val: "Twint"},
    { val: "Cash"},
  ];

  salepoints:SalepointResponseValue = {
    location: {
      type: "Point",
      coordinates: [null, null]
    },
    address: null,
    picture:null,
    paymentMethod: null,
    userId: null,
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
