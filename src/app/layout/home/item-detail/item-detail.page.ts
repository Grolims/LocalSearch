import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemResponseValue } from 'src/app/models/item';
import { NavparamService } from 'src/app/navparam.service';
import { Itemservice } from 'src/app/services/item.service';
import { SalepointMarkerResponseValue } from 'src/app/models/salepointmarker';
import { Salepointservice } from 'src/app/services/salepoint.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {



  data:any = 0;
  items:ItemResponseValue[] = [];
  salepoints:SalepointMarkerResponseValue[] = [];


  constructor(private navParamService:NavparamService, private salepointService: Salepointservice, private router: Router, private itemService: Itemservice) {

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



  ngOnInit() {
  }

}
