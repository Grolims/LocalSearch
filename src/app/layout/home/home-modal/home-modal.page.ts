import { Component, OnDestroy, OnInit } from '@angular/core';

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
import { defaultIcon } from '../../default-marker';
import { CustomMarker } from 'src/app/models/AltMarker';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { ModalController } from '@ionic/angular';
//import { IonRouterOutlet } from '@ionic/angular';
import { SalePointDetailPage } from '../sale-point-detail/sale-point-detail.page';

import { SearchFilterPipe } from 'src/app/search-filter.pipe';
import * as internal from 'stream';
import { ItemDetailPage } from '../item-detail/item-detail.page';
import { element } from 'protractor';

import { ProfilePage } from '../profile/profile.page';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage implements OnInit, OnDestroy {


  searchTerm: string;
  searchPrice;
  mapOptions: MapOptions;
  map: Map;
  mapMarkers: CustomMarker[] = [];
  focusSalepoint: string;
  subscription: Subscription;
  data: any = 0;
  filtreBol;
  public searchFilter: any = '';

  items: ItemResponseValue[] = [];
  salepoints: SalepointMarkerResponseValue[] = [];
  itemsCache: ItemResponseValue[] = [];
  items3: ItemResponseValue[] = [];

  constructor(private itemService: Itemservice,

    private salepointService: Salepointservice,
    private router: Router,
    private navParamService: NavparamService,
    private dataService: DataService,

    //private salePointDetailPage: SalePointDetailPage,
    private auth: AuthService,
    //public routerOutlet: IonRouterOutlet,
    public modalController: ModalController,
    private geolocation: Geolocation,) {

      this.addSalepoint();
    this.addItemCache();
    this.filtreBol = true;
    this.data = this.navParamService.getNavData();

    this.items3 = this.itemsCache;

    }



  lower = 0;
  upper = 120;

  public types = [
    { val: 'Fruit', isChecked: true },
    { val: 'Viande', isChecked: true},
    { val: 'Légumes', isChecked: true },
    { val: 'Céréales', isChecked: true },
    { val: 'Boissons', isChecked: true},
    { val: 'Autre', isChecked: true}
  ];




  price:any =0;
  listItemBool:boolean = false;
  listeEstFiltrer:boolean = false;


  filterAll(event: any){}


  /**
   * Filtre sur la barre de recherhce
   */
  updateBare()
  {

    if (this.listeEstFiltrer == false)
    {
      let result = this.itemsCache.filter(it => it.price >= this.lower && it.price <= this.upper);


      this.items = result
    }else if ( this.listeEstFiltrer == true)
    {

      let result = this.items3.filter(it => it.price >= this.lower && it.price <= this.upper);
      this.items = result;
    }

  }

  /**
   * Change la valeur upper et lower à chaque event de la searchbar
   * @param event evenement
   */
  testChange(event: any)
  {

  this.lower = event.detail.value.lower
  this.upper = event.detail.value.upper

  }

  changeValue(event: any)
  {


    this.price = event.detail.value;

    let result = this.itemsCache.filter(it => it.price >= event.detail.value.lower && it.price <= event.detail.value.upper);

    this.items = result

  }

  /**
   *Méthode de trie en fonction des checkbox
   * @param event event checkbox true or false
   */
  changeValueCheckbox(event: any)
  {

    let result;
    let name = event.explicitOriginalTarget.firstChild.data;
    let isCheck = event.detail.checked;



      if(isCheck == false){
         result = this.items.filter(it=> it.type != name /* && it.price >= this.lower && it.price <= this.upper*/)

         this.types.forEach(element => {
           if(element.isChecked == false)
           {
              let result =this.items3.filter(it=> it.type != element.val)
              this.items3 = result;
           }
         });

         this.items = result;
         this.listeEstFiltrer = true;
      }else{

        result = this.itemsCache.filter(it=> it.type == name)
          result.forEach(element => {
            this.items.push(element);
            this.items3.push(element);

          });


      }



    }



    /**
     * reset du tab apres la recherche
     */
  stopSearch() {
    this.items = [];
  }

  filter() {
    let tab = [];
    this.data[0].forEach(element => {
      if (element.isChecked = true) {
        tab.push(element);
      }
    });

    return tab;

  }



  //ajout des items au tabCach
  addItemCache() {

    this.itemService.getItem().subscribe(item => {
      item.data.forEach(element => {
        this.itemsCache.push(element);

      });


    });


  }



  async presentSalepoint() {
    const modal = await this.modalController.create({
      component: SalePointDetailPage,
      initialBreakpoint: 0.6,
      breakpoints: [0.6, 1],
      backdropBreakpoint: 0.6,
      id: "salepoint"
    });

    //modal.onWillDismiss().then(() => this.didDismiss());

    //modal.onDidDismiss().then(() => this.didDismiss());

   // this.service.storeModal(modal);// storing modal instances in an array
    return await modal.present();
  }

  didDismiss(){

    console.log(" MODAL modal terminée puis creation home modal")
    this.presentHome();
  }

  async presentHome() {
    const modal = await this.modalController.create({
      component: HomeModalPage,

      initialBreakpoint: 0.5,
      breakpoints: [0.15, 0.5, 1],
      backdropBreakpoint: 0.5,
      id: "home"
    });


    //console.log("home modal créé")
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
      breakpoints: [0.5, 1],
      backdropBreakpoint: 0.5,
      id: "profil"
    });

    //modal.onDidDismiss().then(() => this.didDismiss());

   // this.service.storeModal(modal);// storing modal instances in an array
    return await modal.present();
  }

  async closeModal() {
    const emitData: string = "Closed";
    await this.modalController.dismiss(emitData);
  }


  /**
   * Ouverture du modal salpoint detail
   * @param salepoint
   */
  openSalepoint(salepoint) {
    this.dataService.changeMessage(salepoint)
    this.navParamService.setNavData(salepoint);
    this.locateSalepoint();
    this.modalController.dismiss(undefined, undefined, 'home');
    this.presentSalepoint();
    // this.router.navigateByUrl("home/sale-point-detail");
  }




  /**
   * Ajout des salepoints et marker sur la carte
   */
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
        result.push(element);
      }
    });
    this.openSalepoint(result[0])
  }


  filterItems() {
    this.filtreBol = false;
    this.router.navigateByUrl("home/filter-items");
  }



  /**
   * redirige la carte vers le salpoint selectionné (ne marche pas dans le modal)
   */
  locateSalepoint()
  {
    //this.map.setView(latLng(this.salepoints[0].location.coordinates));
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

    this.subscription = this.dataService.currentMessage.subscribe(message => this.focusSalepoint = message);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addItem()
  {
    this.items = this.itemsCache;

  }

  /**
   * Ajout des salepoint correspondants à un articles
   * @param items
   */
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


/**
 * Localisation du salepoint de l'item et redirection de la carte ver ce derner , ouverture des la page detail item
 * @param items
 */
  locateItem(items)
  {
    this.addSalepointId(items);
    //this.map.setView(latLng(this.salepoints[0].location.coordinates));
    this.navParamService.setNavData(items);

    this.presentSalepointItemDetail();

  }

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => map.invalidateSize(), 0);

  }



  /**
   * Ajoute les items si clicl sur la searchbar
   */
  addItEmpty() {
    if (this.items.length == 0) {
      this.addItem();
      this.listItemBool = true;
    }
  }
  closeSearchBar() {

    this.items = [];
     this.listItemBool = false;
  }



  goProfile() {
    //this.router.navigateByUrl("/home/profile");

    this.modalController.dismiss(undefined, undefined, 'home');
    this.presentProfil();
  }




}
