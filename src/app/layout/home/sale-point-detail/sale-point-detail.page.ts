import { Component, OnInit } from '@angular/core';
import { NavparamService } from 'src/app/navparam.service';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { ItemDetailPage } from 'src/app/layout/home/item-detail/item-detail.page';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, FreeMode } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, FreeMode]);

@Component({
  selector: 'app-sale-point-detail',
  templateUrl: './sale-point-detail.page.html',
  styleUrls: ['./sale-point-detail.page.scss'],
})
export class SalePointDetailPage implements OnInit {


  items:ItemResponseValue[] = [];
  salepoints:SalepointResponseValue[] = [];
  data:any = 0;


  constructor(private navParamService:NavparamService,public modalController: ModalController, private router: Router, private itemService: Itemservice,) {

    this.data = this.navParamService.getNavData();
    console.log(this.data);

    this.addItem();

  }

  tabVide:boolean = false;

  addItem() {
    this.itemService.getItem().subscribe(item => {
      item.data.forEach(element => {
        if (element.salepointId == this.data._id)
        {

          this.items.push(element);
        }
      });

    });

    if (this.items.length = 0) {
      this.tabVide = true;
    }

  console.log(this.items);
   }


   async presentSalepointItemDetail() {
    const modal = await this.modalController.create({
      component: ItemDetailPage,
      initialBreakpoint: 0.48,
      breakpoints: [0, 0.48, 0.9],
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


   dismissModal() {
     console.log("salepoint")

    //this.modalController.dismiss();
}


  ngOnInit() {
  }

}
