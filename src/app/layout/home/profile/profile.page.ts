import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  items:ItemResponseValue[] = [];

  constructor(private itemService: Itemservice, private authservice: AuthService, private router: Router) {


    this.authservice.getUser$().subscribe(user=> this.id = user._id)
    this.addItem();


  }
  id:string;

  tabVide:boolean = false;


  updateItem()
  {

    this.router.navigate(['home/profile/update-items'])
  }

  deleteItem()
  {

  }

 addItem() {


   this.itemService.getItem().subscribe(item => {
     item.data.forEach(element => {
       if (element.userId = this.id)
       {
         this.items.push(element);
         console.log(this.items[0].name)
       }
     });
   });

   if (this.items.length = 0) {
     this.tabVide = true;
   }
  }



 ngOnInit() {
 }

}
