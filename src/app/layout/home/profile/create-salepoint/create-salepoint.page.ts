import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';

@Component({
  selector: 'app-create-salepoint',
  templateUrl: './create-salepoint.page.html',
  styleUrls: ['./create-salepoint.page.scss'],
})
export class CreateSalepointPage implements OnInit {

  constructor() { }

  items:ItemResponseValue;
  greeting: string;
  displayedGreeting: string;

  displayGreeting() {
    this.displayedGreeting = this.greeting;
    console.log('Greeting displayed');
  }

  ngOnInit() {
  }

}
