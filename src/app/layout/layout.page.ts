import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from './default-marker';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SalepointResponse, SalepointResponseValue } from '../models/salepoint';
import { Salepointservice } from '../services/salepoint.service';

import { IonRouterOutlet } from '@ionic/angular';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: Marker[] = [];
  salepoints: SalepointResponseValue[] = [];

  constructor(
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private geolocation: Geolocation,
    private salepointService: Salepointservice,

    public routerOutlet: IonRouterOutlet
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

    // this.mapMarkers = [
    //   marker([46.778186, 6.641524], { icon: defaultIcon }),
    //   marker([46.780796, 6.647395], { icon: defaultIcon }),
    //   marker([46.784992, 6.652267], { icon: defaultIcon })
    // ];


  }

  addSalepoint() {

    this.salepointService.getSalepoint().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        this.salepoints.push(element);
        this.mapMarkers.push(marker(element.location.coordinates, {icon: defaultIcon}));
      });


    });
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
    this.router.navigateByUrl("/home");
  }
  goProfile()
  {
    this.router.navigateByUrl("/home/profile");
  }

}

