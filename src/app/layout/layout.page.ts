import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  mapOptions: MapOptions;

  constructor(
    private auth: AuthService,
    // Inject the router
    private router: Router

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


  }

  ngOnInit() {
  }



  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

}

