import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemResponseValue } from 'src/app/models/item';
import { NavparamService } from 'src/app/navparam.service';
import { Itemservice } from 'src/app/services/item.service';
import { SalepointMarkerResponseValue } from 'src/app/models/salepointmarker';
import { Salepointservice } from 'src/app/services/salepoint.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';

import { ModalController } from '@ionic/angular';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {



  data:any = 0;
  items:ItemResponseValue[] = [];
  salepoints:SalepointMarkerResponseValue[] = [];
  focusSalepoint: string;
  subscription: Subscription;


  constructor(
    private navParamService:NavparamService,
    public modalController: ModalController,
    private salepointService: Salepointservice,
    private router: Router,
    private itemService: Itemservice,
    private dataService: DataService) {

    this.data = this.navParamService.getNavData();

    this.addSalepoint();
    console.log(this.salepoints);
  }

  addSalepoint() {

    this.salepointService.getSalepointIDs().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        if (element._id == this.data.salepointId)
        {
          this.salepoints.push(element);

        }

      });


    });
  }

  async presentHome() {
    const modal = await this.modalController.create({
      component: HomeModalPage,
      
      initialBreakpoint: 0.5,
      breakpoints: [0.15, 0.5, 1],
      backdropBreakpoint: 0.5,
      id: "home"



    });
    

    
   // this.service.storeModal(modal);// storing modal instances in an array
    return await modal.present();
  }

  dismissModal() {
    console.log("salepoint");

   this.modalController.dismiss();
   //this.presentHome();
   
} 

  openSalepoint(salepoint) {
    this.dataService.changeMessage(salepoint)
  }  

  ngOnInit() {
    this.subscription = this.dataService.currentMessage.subscribe(message => this.focusSalepoint = message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
