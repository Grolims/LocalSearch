import { Component, OnInit } from '@angular/core';
import { NavparamService } from 'src/app/navparam.service';
import { ItemResponseValue } from 'src/app/models/item';
import { Itemservice } from 'src/app/services/item.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sale-point-detail',
  templateUrl: './sale-point-detail.page.html',
  styleUrls: ['./sale-point-detail.page.scss'],
})
export class SalePointDetailPage implements OnInit {


  items:ItemResponseValue[] = [];
  salepoints:SalepointResponseValue[] = [];
  data:any = 0;


  constructor(private navParamService:NavparamService, private router: Router, private itemService: Itemservice,) {

    this.data = this.navParamService.getNavData();
    console.log(this.data._id);
    this.addItem();

  }

  tabVide:boolean = false;

  addItem() {


    this.itemService.getItem().subscribe(item => {
      item.data.forEach(element => {
        if (element.salepointId == this.data._id)
        {
          console.log(element.salepointId);
          console.log(this.data._id);
          this.items.push(element);
        }
      });
    });

    if (this.items.length = 0) {
      this.tabVide = true;
    }
   }

   openItem(item)
   {
    this.navParamService.setNavData(item);
    this.router.navigateByUrl("home/item-detail");
   }



  ngOnInit() {
  }

}
