import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NavparamService } from 'src/app/navparam.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  items:ItemResponseValue[] = [];

  constructor(private itemService: Itemservice, private authservice: AuthService, private router: Router, private navParamService:NavparamService) {


    this.authservice.getUser$().subscribe(user=> this.id = user._id)
    this.addItem();


  }
  id:string;

  tabVide:boolean = false;


  updateItem(oneItem)
  {
    this.navParamService.setNavData(oneItem);
    this.router.navigateByUrl("home/profile/update-items");
  }

  deleteItem(oneItem)
  {

  }

 addItem() {


   this.itemService.getItem().subscribe(item => {
     item.data.forEach(element => {
       if (element.userId = this.id)
       {
         this.items.push(element);
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
