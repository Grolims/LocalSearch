import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from './default-marker';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SalepointResponse, SalepointResponseValue } from '../models/salepoint';
import { Salepointservice } from '../services/salepoint.service';

// Salepoint with IDs imports
import { SalepointMarkerResponseValue } from '../models/salepointmarker';
import { CustomMarker } from '../models/AltMarker';
import { SalepointMarkerResponse } from '../models/salepointmarker';

import { ModalController } from '@ionic/angular';
import { HomePage } from '../layout/home/home.page';


import { IonRouterOutlet } from '@ionic/angular';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: CustomMarker[] = [];
  salepoints: SalepointResponseValue[] = [];
  salepointMarkers: SalepointMarkerResponseValue[] = [];


  constructor(
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private geolocation: Geolocation,
    private salepointService: Salepointservice,

    public modalController: ModalController,
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
    this.goHome();


  }



  addSalepoint() {

    this.salepointService.getSalepointIDs().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        this.salepoints.push(element);

        const newMarker: CustomMarker = marker(
          element.location.coordinates,
          {icon: defaultIcon},
          ).on('click', this.markerClick);

        newMarker.options.title = element.address
        newMarker.id = element._id;

        this.mapMarkers.push(newMarker);
      });


    });
  }

  markerClick(e) {
    let salepointId = e.target.id;

    // Add clicked salepoint logic here
    console.log(salepointId);
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

