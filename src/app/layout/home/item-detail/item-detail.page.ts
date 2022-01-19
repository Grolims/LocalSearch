import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemResponseValue } from 'src/app/models/item';
import { NavparamService } from 'src/app/navparam.service';
import { Itemservice } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {



  data:any = 0;
  items:ItemResponseValue[] = [];

  constructor(private navParamService:NavparamService, private router: Router, private itemService: Itemservice) {

    this.data = this.navParamService.getNavData();
  }

  ngOnInit() {
  }

}
