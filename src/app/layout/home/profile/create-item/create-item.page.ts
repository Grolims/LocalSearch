import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { Salepointservice } from 'src/app/services/salepoint.service';
import { SalepointResponse, SalepointResponseValue } from 'src/app/models/salepoint';
import { NgForm } from "@angular/forms";
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  salepoints: SalepointResponseValue[] = [

  ];

  constructor(public httpClient: HttpClient, private salepointService: Salepointservice,private authservice: AuthService) {
    this.addSalepoint();
    this.authservice.getUser$().subscribe(user=> this.items.userId = user._id)

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



  items:ItemResponseValue = {

    name: null,
    type: "Fruit",
    description: null,
    picture:null,
    label:"Bio",
    price:null,
    userId:null,
    salepointId: null,
    creationDate: null,

  };


  postOK:boolean;
  postError:boolean;
  greeting: string;
  displayedGreeting: string;

  displayGreeting() {
    this.displayedGreeting = this.greeting;
    console.log('Greeting displayed');
  }

  test() {

  }


  addSalepoint() {

    this.salepointService.getSalepoint().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        this.salepoints.push(element);
      });


    });
  }

  createItem(form: NgForm){



    if (form.invalid) {
      return;
    }

    console.log(this.items)


    this.httpClient.post("https://localsearch-ch.herokuapp.com/items", this.items)
    .subscribe(data => {

      console.log(data);
     }, error => {
      this.postError = true;
      console.warn(`Post failed: ${error.message}`);
      console.log(error);
    });

    this.postOK = true;

  }

  ngOnInit() {


  }

}
