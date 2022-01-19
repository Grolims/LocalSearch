import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NavparamService } from 'src/app/navparam.service';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  items:ItemResponseValue[] = [];

  constructor(public alertController: AlertController, public httpClient: HttpClient, private itemService: Itemservice, private authservice: AuthService, private router: Router, private navParamService:NavparamService) {


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

  createNewitem()
  {
    console.log("create buttun")
    this.router.navigateByUrl("home/profile/create-item");
  }

  async deleteItem(oneItem)
  {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete'+ oneItem.name,
      message: 'Message <strong>Sure you want delete </strong>'+oneItem.name +"?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.httpClient.delete("https://localsearch-ch.herokuapp.com/items/"+oneItem._id)
            .subscribe(data => {
              console.log(data);
            }, error => {
              console.warn(`Post failed: ${error.message}`);
              console.log(error);
            });

              const isitem = (element) => element == oneItem;

              const indexDel = this.items.findIndex(isitem);
              this.items.splice(indexDel,1);

            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();


  }

 addItem() {


   this.itemService.getItem().subscribe(item => {
     item.data.forEach(element => {
       if (element.userId == this.id)
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
