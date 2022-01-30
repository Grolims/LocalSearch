import { Component, OnInit } from '@angular/core';
import { Itemservice } from 'src/app/services/item.service';
import { Salepointservice } from 'src/app/services/salepoint.service';
import { ItemResponse } from 'src/app/models/item';
import { ItemResponseValue } from 'src/app/models/item';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { SalepointMarkerResponseValue } from 'src/app/models/salepointmarker';
import { NavparamService } from 'src/app/navparam.service';
import { Router } from '@angular/router';
import { AuthService } from "src/app/auth/auth.service";
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from '../default-marker';
import { CustomMarker } from 'src/app/models/AltMarker';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Icon, IconOptions, icon } from 'leaflet';

import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { SalePointDetailPage } from './sale-point-detail/sale-point-detail.page';

import { SearchFilterPipe } from 'src/app/search-filter.pipe';
import * as internal from 'stream';
import { ItemDetailPage } from './item-detail/item-detail.page';
import { element } from 'protractor';

import { ProfilePage } from './profile/profile.page';
import { HomeModalPage } from './home-modal/home-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  searchTerm: string;
  searchPrice;
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: CustomMarker[] = [];
  data: any = 0;
  filtreBol;
  public searchFilter: any = '';

  items: ItemResponseValue[] = [];
  salepoints: SalepointMarkerResponseValue[] = [];
  itemsCache: ItemResponseValue[] = [];
  items3: ItemResponseValue[] = [];
  positionIcon: Icon = icon({
    iconUrl: '../../../assets/image/position.png',

    iconSize: [40, 40], // => random values you have to choose right ones for your case
    //iconAnchor: [20, 51] // => random values too
  });


  constructor(private itemService: Itemservice,

    private salepointService: Salepointservice,
    private router: Router,
    private navParamService: NavparamService,

    //private salePointDetailPage: SalePointDetailPage,
    private auth: AuthService,
    public routerOutlet: IonRouterOutlet,
    public modalController: ModalController,
    private geolocation: Geolocation,


    //private icon: Icon
  ) {

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoomControl: false,
      doubleClickZoom: true,
      zoom: 13,
      center: latLng(46.778186 - 0.02, 6.641524)
    };
    this.addSalepoint();
    console.log("addsalehome");
    this.filtreBol = true;
    this.data = this.navParamService.getNavData();

    this.items3 = this.itemsCache;




  }




  price:any =0;
  listItemBool:boolean = false;
  listeEstFiltrer:boolean = false;

  testClick()
  {


  }











  ionViewDidEnter() {
    this.presentHome();
   // this.openSalepoint();
  }

  async presentHome() {
    const modal = await this.modalController.create({
      component: HomeModalPage,

      initialBreakpoint: 0.5,
      breakpoints: [0.15, 0.5, 1],
      backdropBreakpoint: 0.5,
      id: "home"

    });



    console.log("home modal créé")

   // this.service.storeModal(modal);// storing modal instances in an array
    return await modal.present();
  }




  async presentSalepoint() {
    const modal = await this.modalController.create({
      component: SalePointDetailPage,
      initialBreakpoint: 0.6,
      breakpoints: [0.6, 1],
      backdropBreakpoint: 0.6,
      swipeToClose: true,
      id: "salepoint"



    });


  //modal.onWillDismiss().then(() => this.didDismiss());
 //modal.onDidDismiss().then(() => this.didDismiss());
   // this.service.storeModal(modal);// storing modal instances in an array
    return await modal.present();
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

  async presentProfil() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
      backdropBreakpoint: 0.5,
      id: "profil"



    });


   // this.service.storeModal(modal);// storing modal instances in an array
    return await modal.present();
  }

  openSalepoint(salepoint) {

    this.navParamService.setNavData(salepoint);
    this.locateSalepoint(salepoint);
    this.presentSalepoint();

    // this.router.navigateByUrl("home/sale-point-detail");
  }


    save()
    {

    }

  addSalepoint() {

    this.salepointService.getSalepointIDs().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        this.salepoints.push(element);

        const newMarker: CustomMarker = marker(
          element.location.coordinates,
          {icon: defaultIcon},
          ).on('click', (e)=> {this.markerClick(e)});

        newMarker.options.title = element.address
        newMarker.id = element._id;

        this.mapMarkers.push(newMarker);
      });


    });
  }



    /**gestion de click sur marker salepoint */
  markerClick(e) {
    let result = [];
    const clickedSalepoint = e.target.id;
    console.log("This is the salepoint " + clickedSalepoint)
    // console.log("IDtargt: "+ idsalepoint);
    this.salepoints.forEach(element => {
      // console.log(element._id);
      if (element._id == clickedSalepoint) {
        console.log("id identique");
        this.modalController.dismiss();

        result.push(element);
      }
    });
    this.openSalepoint(result[0])
  }




  locateSalepoint(salepoint)
  {

    console.log("LOCA " + (salepoint.location.coordinates[0] -0.02));
    const lat = salepoint.location.coordinates[0] - 0.001;
    const lon = salepoint.location.coordinates[1];
    this.map.flyTo(latLng(lat, lon), 18);
  }

  ngOnInit() {
    // Geoposition is an interface that describes the position object
   /* this.geolocation.getCurrentPosition().then((position) => {
      const coords = position.coords;
      // console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.map.flyTo(latLng(coords.latitude - 0.02, coords.longitude));
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });*/

    this.centerMap();


  }
  addItem()
  {
    this.items = this.itemsCache;

  }

  /*

  addSalepointId(items)
{
  this.salepointService.getSalepointIDs().subscribe(salepoint => {
    salepoint.data.forEach(element => {
      if (element._id == items.salepointId)
      {
        this.salepoints.push(element);
      }

    });


  });
}
*/

/*
  locateItem(items)
  {
    this.addSalepointId(items);
    this.map.setView(latLng(this.salepoints[0].location.coordinates));
    this.navParamService.setNavData(items);

    this.presentSalepointItemDetail();

  }*/

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => map.invalidateSize(), 0);

  }





  didDismiss(){

    console.log(" HOME modal terminée puis creation home modal")
    this.presentHome();
  }
  goHome() {

    //this.router.navigateByUrl("/home");
  }
  goProfile() {
    //this.router.navigateByUrl("/home/profile");

    this.modalController.dismiss(undefined, undefined, 'home');   this.presentProfil();
  }


  centerMap(){



    this.geolocation.getCurrentPosition().then((position) => {


      const coords = position.coords;

      const newMarker: CustomMarker = marker(
        [coords.latitude,coords.longitude],
        {icon: this.positionIcon},
        );

      this.mapMarkers.push(newMarker);
      // console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.map.flyTo(latLng(coords.latitude - 0.01, coords.longitude),14);
      console.log("map centré !!!")
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);

    });
  }
}
