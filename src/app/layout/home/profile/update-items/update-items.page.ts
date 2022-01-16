import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.page.html',
  styleUrls: ['./update-items.page.scss'],
})
export class UpdateItemsPage implements OnInit {

    data: any;

  constructor(private itemService: Itemservice, private authservice: AuthService, private activatedRoute: ActivatedRoute) {

   /* this.activatedRoute.paramMap.subscribe(
      (data) => {
        console.log(data);      }
        }
    )
*/

this.data = this.activatedRoute.snapshot.
                  paramMap.get('update-items');



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

  updateItems(form: NgForm)
  {

  }

  ngOnInit() {
  }

}



