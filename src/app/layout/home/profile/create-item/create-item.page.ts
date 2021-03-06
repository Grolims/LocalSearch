import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { Salepointservice } from 'src/app/services/salepoint.service';
import { SalepointResponse, SalepointResponseValue } from 'src/app/models/salepoint';
import { NgForm } from "@angular/forms";
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { PictureService } from 'src/app/picture/picture.service';
import { Itemservice } from 'src/app/services/item.service';
import { Router } from "@angular/router";
import { NavparamService } from 'src/app/navparam.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  salepoints: SalepointResponseValue[] = [

  ];

  constructor(public toastController: ToastController,public modalController: ModalController, private navParamService:NavparamService,public httpClient: HttpClient, private itemService: Itemservice,private salepointService: Salepointservice,private pictureService: PictureService, private authservice: AuthService, private router: Router) {
    this.addSalepoint();
    this.authservice.getUser$().subscribe(user=> this.items.userId = user._id)
    this.authservice.getUser$().subscribe(user=> this.idSa = user._id)
   }

   idSa:string;

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

  };


  postOK:boolean;
  postError:boolean;
  greeting: string;
  errorMsg:string;
  salepointBool:boolean = false;
  displayedGreeting: string;
  errorComplte:string;

  displayGreeting() {
    this.displayedGreeting = this.greeting;
    console.log('Greeting displayed');
  }

  test() {

  }

  salepointVide()
  {
    if(this.salepoints.length == 0)
    {
     return this.salepointBool = true;
    }
  }

  async sucessToast() {
    const toast = await this.toastController.create({
      message: 'Le produit a été créé avec succès',
      icon: 'information-circle',
      color: 'success',
      duration: 3000
    });
    toast.present();
  }

  addSalepoint() {

    //recup par id car pas le possibilité de le faire depuis l'api
    this.salepointService.getSalepoint().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        if (element.userId == this.idSa)
        {
          this.salepoints.push(element);
        }

      });


    });
  }

  createItem(form: NgForm){


    if (form.invalid) {
      return;
    }

    console.log(this.items)

    this.postError = false;

    this.itemService.postItem(this.items)
    .subscribe(data => {

      console.log(data);
      this.postOK = true;
      this.sucessToast();
      this.modalController.dismiss();

    this.navParamService.setNavData(this.items);

    //this.router.navigateByUrl("home/profile");

     }, error => {
      this.postError = true;
      console.warn(`Post failed: ${error.message}`);
      this.errorMsg = error.message
      this.errorComplte = error.error;
      console.log(error);
    });




  }

  takePicture()
  {
    this.pictureService.takeAndUploadPicture()
    .subscribe(pict=> {
      console.log(pict)
      this.items.picture = pict.url
    })
  }

  ngOnInit() {


  }

  dismissModal() {
  

    this.modalController.dismiss();
    
    
   } 

}
