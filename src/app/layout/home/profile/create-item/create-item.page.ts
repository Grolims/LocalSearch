import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  constructor(public httpClient: HttpClient) { }
  items:ItemResponseValue = {

    name: null,
    type: null,
    description: null,
    picture:null,
    label:null,
    price:null,
    userId:null,
    salepointId: null,
    creationDate: null,

  };



  greeting: string;
  displayedGreeting: string;

  displayGreeting() {
    this.displayedGreeting = this.greeting;
    console.log('Greeting displayed');
  }

  test() {

  }

  createItem(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );




    console.log(this.items)
    this.httpClient.post("https://localsearch-ch.herokuapp.com/items", this.items)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);
    });

  }

  ngOnInit() {


  }

}
