import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Itemservice } from 'src/app/services/item.service';
import { SalepointResponseValue } from 'src/app/models/salepoint';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PictureService } from 'src/app/picture/picture.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastController } from '@ionic/angular';
import { defaultIcon } from 'src/app/layout/default-marker';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-create-salepoint',
  templateUrl: './create-salepoint.page.html',
  styleUrls: ['./create-salepoint.page.scss'],
  styles: ['.map {height: 40vh}'],
})
export class CreateSalepointPage implements OnInit {

  map: Map;
  mapMarkers: Marker[] = [];
  mapOptions: MapOptions;

  constructor(
    public toastController: ToastController,
    public httpClient: HttpClient,
    private pictureService: PictureService,
    public modalController: ModalController,
    private authservice: AuthService) {

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

    this.authservice.getUser$().subscribe(user => this.salepoints.userId = user._id)
  }

  public paymentMethods = [
    { val: "Card" },
    { val: "Twint" },
    { val: "Cash" },
  ];

  public arrayCoord = [
    512,
    536
  ]

  salepoints: SalepointResponseValue = {
    location: {
      type: "Point",
      coordinates: [46.78122855934512,
        6.640899487443858]
    },
    address: null,
    picture: null,
    paymentMethod: "Cash",
    userId: null,
  };
  postError: boolean;
  postOk: boolean;
  errorMsg: string;
  errorComplte: string;
  displayedCoord: any;

  async sucessToast() {
    const toast = await this.toastController.create({
      message: 'Point de vente créé avec succès',
      duration: 2000
    });
    toast.present();
  }

  displayCoord()
  {
    this.displayedCoord = this.salepoints.location.coordinates;
  }

  createSalepoint(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.postError = false;

    console.log(this.salepoints)
    this.httpClient.post("https://localsearch-ch.herokuapp.com/salepoints", this.salepoints)
      .subscribe(data => {
        console.log(data);
        this.postOk = true;
        this.sucessToast();
        this.modalController.dismiss();
      }, error => {
        this.postError = true;
        console.warn(`Post failed: ${error.message}`);
        console.log(error);
        this.errorMsg = error.message;
        this.errorComplte = error.error;

      });

  }

  takePicture() {
    this.pictureService.takeAndUploadPicture()
      .subscribe(pict => {
        console.log(pict)
        this.salepoints.picture = pict.url
      })
  }

  onMapReady(map: Map) {
    this.map = map;
    map.on('click', <LeafletMouseEvent>(e) => {
      let coords = e.latlng
      this.salepoints.location.coordinates = [coords.lat, coords.lng];
      this.displayCoord();
      this.addMarker(coords);
     });
    setTimeout(() => map.invalidateSize(), 0);
  }

  addMarker(coords) {
    const newMarker = marker(coords, {icon: defaultIcon});
    this.mapMarkers.pop();
    this.mapMarkers.push(newMarker);
  }

  ngOnInit() {
  }

  dismissModal() {
  

    this.modalController.dismiss();
    
    
   } 

}
