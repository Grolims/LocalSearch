import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isHomeModal = true;
  searchTerm: string;
  searchPrice;
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: CustomMarker[] = [];
  data: any = 0;
  focusSalepoint: string;
  subscription: Subscription;
  filtreBol;
  public searchFilter: any = '';

  items: ItemResponseValue[] = [];
  salepoints: SalepointMarkerResponseValue[] = [];
  itemsCache: ItemResponseValue[] = [];
  items3: ItemResponseValue[] = [];
  positionIcon: Icon = icon({
    iconUrl: '../../../assets/image/position.png',

    iconSize: [40, 40],
  });


  constructor(private itemService: Itemservice,

    private salepointService: Salepointservice,
    private router: Router,
    private navParamService: NavparamService,
    private dataService: DataService,


    private auth: AuthService,
    public routerOutlet: IonRouterOutlet,
    public modalController: ModalController,
    private geolocation: Geolocation,


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
    this.filtreBol = true;
    this.data = this.navParamService.getNavData();

    this.items3 = this.itemsCache;




  }




  price: any = 0;
  listItemBool: boolean = false;
  listeEstFiltrer: boolean = false;

  testClick() {


  }


  ionViewDidEnter() {
    this.presentHome();
  }

  async presentHome() {
    const modal = await this.modalController.create({
      component: HomeModalPage,
      initialBreakpoint: 0.5,
      breakpoints: [0.15, 0.5, 1],
      backdropBreakpoint: 0.5,
      id: "home",

    });
    return await modal.present();
  }




  async presentSalepoint() {
    const modal = await this.modalController.create({
      component: SalePointDetailPage,
      componentProps: { isHomeModal: this.isHomeModal },
      initialBreakpoint: 0.6,
      breakpoints: [0.6, 1],
      backdropBreakpoint: 0.6,
      swipeToClose: true,
      id: "salepoint"
    });

    return await modal.present();
  }



  async presentSalepointItemDetail() {
    const modal = await this.modalController.create({
      component: ItemDetailPage,
      initialBreakpoint: 0.48,
      breakpoints: [0, 0.48, 0.9],
      id: "item"
    });

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


    return await modal.present();
  }

  openSalepoint(salepoint) {

    this.navParamService.setNavData(salepoint);
    this.locateSalepoint(salepoint);
    this.presentSalepoint();

  }


  save() {

  }

  addSalepoint() {

    this.salepointService.getSalepointIDs().subscribe(salepoint => {
      salepoint.data.forEach(element => {
        this.salepoints.push(element);

        const newMarker: CustomMarker = marker(
          element.location.coordinates,
          { icon: defaultIcon },
        ).on('click', (e) => { this.markerClick(e) });

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
    this.salepoints.forEach(element => {
      if (element._id == clickedSalepoint) {
        this.modalController.dismiss();

        result.push(element);
      }
    });
    this.openSalepoint(result[0])
    console.log(this.focusSalepoint)
  }




  locateSalepoint(salepoint) {
    const lat = salepoint.location.coordinates[0] - 0.001;
    const lon = salepoint.location.coordinates[1];
    this.map.flyTo(latLng(lat, lon), 18);
  }

  ngOnInit() {
    this.centerMap();
    this.subscription = this.dataService.currentMessage.subscribe(message => {
      if (!(message === 'none')) {
        this.locateSalepoint(message);
        this.focusSalepoint = message;
      }

    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addItem() {
    this.items = this.itemsCache;

  }



  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => map.invalidateSize(), 0);

  }





  didDismiss() {


    this.presentHome();
  }

  goProfile() {


    this.modalController.dismiss(undefined, undefined, 'home'); this.presentProfil();
  }


  centerMap() {



    this.geolocation.getCurrentPosition().then((position) => {


      const coords = position.coords;

      const newMarker: CustomMarker = marker(
        [coords.latitude, coords.longitude],
        { icon: this.positionIcon },
      );

      this.mapMarkers.push(newMarker);

      this.map.flyTo(latLng(coords.latitude - 0.01, coords.longitude), 14);

    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);

    });
  }
}
