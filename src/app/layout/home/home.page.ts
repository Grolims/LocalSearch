import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { Salepointservice } from 'src/app/services/salepoint.service';
import { ItemResponse } from 'src/app/models/item';
import { ItemResponseValue } from 'src/app/models/item';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { NavparamService } from 'src/app/navparam.service';
import { Router } from '@angular/router';


import { AuthService } from "src/app/auth/auth.service";
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from '../default-marker';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: Marker[] = [];

  items:ItemResponseValue[] = [];
  salepoints:SalepointResponseValue[] = [];
  constructor(private itemService: Itemservice,
    private salepointService: Salepointservice,
    private router: Router,
    private navParamService:NavparamService,

    private auth: AuthService,
    public routerOutlet: IonRouterOutlet,
    private geolocation: Geolocation,
    ) {


      this.mapOptions = {
        layers: [
          tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18 }
          )
        ],
        zoom: 13,
        center: latLng(46.778186, 6.641524)
      };
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
        this.mapMarkers.push(marker(element.location.coordinates, {icon: defaultIcon}));
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
    // Geoposition is an interface that describes the position object
    this.geolocation.getCurrentPosition().then((position) => {
      const coords = position.coords;
      // console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.map.setView(latLng(coords.latitude, coords.longitude));
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => map.invalidateSize(), 0);
    
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  goHome()
  {
    
    //this.router.navigateByUrl("/home");
  }
  goProfile()
  {
    //this.router.navigateByUrl("/home/profile");
    
  }

}
