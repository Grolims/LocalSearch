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
import { CustomMarker } from 'src/app/models/AltMarker';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { SalePointDetailPage } from './sale-point-detail/sale-point-detail.page';

import { SearchFilterPipe } from 'src/app/search-filter.pipe';
import * as internal from 'stream';
import { ItemDetailPage } from './item-detail/item-detail.page';



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
  salepoints: SalepointResponseValue[] = [];
  itemsCache: ItemResponseValue[] = [];

  constructor(private itemService: Itemservice,

    private salepointService: Salepointservice,
    private router: Router,
    private navParamService: NavparamService,

    //private salePointDetailPage: SalePointDetailPage,
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
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
    this.addSalepoint();
    this.filtreBol = true;
    this.data = this.navParamService.getNavData();




  }

  stopSearch() {
    this.items = [];
  }

  filter() {

    const result = this.items.filter(it => it.price < this.data[1].upper && it.price > this.data[1].lower);
    console.log(result);

    let tab = [];
    this.data[0].forEach(element => {
      if (element.isChecked = true) {
        tab.push(element);
      }
    });

    return tab;

    console.log(tab);
  }



  addItem() {

    this.itemService.getItem().subscribe(item => {
      item.data.forEach(element => {
        this.items.push(element);

      });


    });
    console.log(this.data)

  }



  async presentSalepoint() {
    const modal = await this.modalController.create({
      component: SalePointDetailPage,
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.9]
    });
    return await modal.present();
  }

  async presentSalepointItemDetail() {
    const modal = await this.modalController.create({
      component: ItemDetailPage,
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.9]
    });
    return await modal.present();
  }

  openSalepoint(salepoint) {
    this.navParamService.setNavData(salepoint);

    this.presentSalepoint();



    // this.router.navigateByUrl("home/sale-point-detail");
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




  detailItem() {

  }

  filterItems() {
    this.filtreBol = false;
    console.log(this.filtreBol);
    this.router.navigateByUrl("home/filter-items");
  }

  updateItems() {


  }


  public types = [
    { val: 'Fruit', isChecked: true },
    { val: 'Viande', isChecked: false },
    { val: 'Légumes', isChecked: false },
    { val: 'Céréales', isChecked: false },
    { val: 'Boissons', isChecked: false },
    { val: 'Autre', isChecked: false }
  ];



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


  locateItem(items)
  {
    this.addSalepointId(items);
    this.map.setView(latLng(this.salepoints[0].location.coordinates));
    this.navParamService.setNavData(items);

    this.presentSalepointItemDetail();

  }

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => map.invalidateSize(), 0);

  }

  logOut() {
    console.log("logging out...");
    this.modalController.dismiss()
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  addItEmpty() {
    if (this.items.length == 0) {
      this.addItem();
    }
  }
  closeSearchBar() {
    console.log("tset");
    this.items = [];
  }


  goHome() {

    //this.router.navigateByUrl("/home");
  }
  goProfile() {
    //this.router.navigateByUrl("/home/profile");

  }

}
