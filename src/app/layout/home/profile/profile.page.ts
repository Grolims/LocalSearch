import { Component, OnInit } from '@angular/core';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Data, Router } from '@angular/router';
import { NavparamService } from 'src/app/navparam.service';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { AlertController } from '@ionic/angular';
import { Salepointservice } from 'src/app/services/salepoint.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { ModalController } from '@ionic/angular';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { CreateItemPage } from './create-item/create-item.page';
import { CreateSalepointPage } from './create-salepoint/create-salepoint.page';
import { ItemDetailPage } from '../item-detail/item-detail.page';
import { SalePointDetailPage } from '../sale-point-detail/sale-point-detail.page';
import { UpdateItemsPage } from './update-items/update-items.page';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isProfilModal = true;

  items:ItemResponseValue[] = [];
  salepoints:SalepointResponseValue[] = [];
  data:any = 0;
  focusSalepoint: string;
  subscription: Subscription;

  constructor(
    public alertController: AlertController,
    private auth: AuthService,
    public modalController: ModalController,
    public httpClient: HttpClient,
    private itemService: Itemservice,
    private authservice: AuthService,
    private router: Router,
    private navParamService:NavparamService,
    private salepointService: Salepointservice,
    private dataService: DataService
    ) {


    this.authservice.getUser$().subscribe(user=> this.id = user._id)
    this.authservice.getUser$().subscribe(user=> this.idSa = user._id)
    this.data = this.navParamService.getNavData();
    console.log(this.data);
    this.addItem();
    console.log(this.items)
    this.addSalepoint();


  }
  id:string;
  idSa:string;

  tabVide:boolean = false;


  updateItem(oneItem)
  {
    this.navParamService.setNavData(oneItem);
    this.presentUpdateItems();
    //this.router.navigateByUrl("home/profile/update-items");
  }

  createNewitem()
  {
    console.log("create buttun")
    this.presentCreateItem();
    //this.router.navigateByUrl("home/profile/create-item");
  }

  createNewSalepoint()
  {
    console.log("create buttun");
    this.presentCreateSalepoint();
    //this.router.navigateByUrl("home/profile/create-salepoint");
  }

  async deleteItem(oneItem)
  {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Êtes-vous sûr de vouloir supprimer définitivement '+ oneItem.name +" ?",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Supprimer',
          handler: () => {
            this.itemService.delItem(oneItem._id)
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

  addSalepoint() {

    this.salepointService.getSalepoint().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        if (element.userId == this.idSa)
        {
          this.salepoints.push(element);
        }

      });


    });
    
  }

  ionViewWillEnter

 ngOnInit() {
 }


 

async presentCreateSalepoint() {
  const modal = await this.modalController.create({
    component: CreateSalepointPage,

    initialBreakpoint: 1,
    breakpoints: [0, 1],

    id: "createSalepoint"



  });
  console.log("createSalepoint modal créé")


 // this.service.storeModal(modal);// storing modal instances in an array
  return await modal.present();
}

async presentCreateItem() {
  const modal = await this.modalController.create({
    component: CreateItemPage,

    initialBreakpoint: 1,
    breakpoints: [0, 1],

    id: "createItem"



  });
  //console.log("createSalepoint modal créé")


 // this.service.storeModal(modal);// storing modal instances in an array
  return await modal.present();
}

async presentUpdateItems() {
  const modal = await this.modalController.create({
    component: UpdateItemsPage,
    initialBreakpoint: 1,
    breakpoints: [0, 1],

    id: "updateSalepoint"



  });
  console.log("createSalepoint modal créé")


 // this.service.storeModal(modal);// storing modal instances in an array
  return await modal.present();
}

async presentSalepoint() {
  const modal = await this.modalController.create({
    component: SalePointDetailPage,
    componentProps: { isProfilModal: this.isProfilModal },
    initialBreakpoint: 0.6,
    breakpoints: [0.6, 1],
    backdropBreakpoint: 0.6,
    id: "salepoint"
  });
  return await modal.present();
}


openSalepoint(salepoint) {
  this.dataService.changeMessage(salepoint)
  this.navParamService.setNavData(salepoint);
  this.modalController.dismiss(undefined, undefined, 'profil');
    this.presentSalepoint();
  // this.router.navigateByUrl("home/sale-point-detail");
}

async presentSalepointItemDetail() {
  const modal = await this.modalController.create({
    component: ItemDetailPage,
    initialBreakpoint: 0.9,
    breakpoints: [0, 0.9],
    id: "item"
  });
  //this.service.storeModal(modal);// storing modal instances in an array
  return await modal.present();
}

openItem(item)
   {
    this.navParamService.setNavData(item);
    this.presentSalepointItemDetail();
    //this.router.navigateByUrl("home/item-detail");
   }




async presentHome() {
  const modal = await this.modalController.create({
    component: HomeModalPage,

    initialBreakpoint: 0.5,
    breakpoints: [0.15, 0.5, 1],
    backdropBreakpoint: 0.5,
    id: "home"



  });


  //console.log("home modal créé")
 // this.service.storeModal(modal);// storing modal instances in an array
  return await modal.present();
}

dismissModal() {
  

 this.modalController.dismiss();
 this.presentHome();
 
} 
logOut() {
  console.log("logging out...");
  this.router.navigateByUrl("/login");
  this.modalController.dismiss();
  this.auth.logOut();
  
   
}


}
