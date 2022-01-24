import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { Salepointservice } from 'src/app/services/salepoint.service';
import { ItemResponse } from 'src/app/models/item';
import { ItemResponseValue } from 'src/app/models/item';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { NavparamService } from 'src/app/navparam.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items:ItemResponseValue[] = [];
  salepoints:SalepointResponseValue[] = [];
  constructor(private itemService: Itemservice, private salepointService: Salepointservice, private router: Router, private navParamService:NavparamService) {

    this.addSalepoint();

  }


  addItem() {

    this.itemService.getItem().subscribe(item => {
      item.data.forEach(element => {
        this.items.push(element);
        console.log(this.items[0].name)
      });


    });
   }

   openSalepoint(salepoint)
   {
    this.navParamService.setNavData(salepoint);
    this.router.navigateByUrl("home/sale-point-detail");
   }

   addSalepoint() {

    this.salepointService.getSalepoint().subscribe(salepoint=> {
      salepoint.data.forEach(element => {

        this.salepoints.push(element);
      });


    });
   }

   filterItems()
   {
    this.router.navigateByUrl("home/filter-items");
   }

   updateItems(){


   }



  ngOnInit() {
  }

}
