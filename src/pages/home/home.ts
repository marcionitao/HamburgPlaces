import { PlacesPage } from './../places/places';
import { PlacesService } from './../../providers/places-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 In this page is defined the map with my location and an option to choose the type of business for the search
 */

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement;

  map: any;
  marker: any;
  search: any;

  tipo: string;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private platform: Platform,
    public viewCtrl: ViewController,
    private service: PlacesService,
    private geolocation: Geolocation
  ) {

    platform.ready().then(() => {
      this.initMap();
      this.getDefaults();
      // this.service.geoCode();
  
    })

  }

  /*ionViewDidLoad() {
    this.initMap();
  }*/

  dismiss() {
    // this.viewCtrl.dismiss();
    this.viewCtrl.dismiss().catch(() => { });
  }

  // value pré-default to type
  getDefaults(){
  if (localStorage.getItem('tipo') != null){
      this.tipo = localStorage.getItem('tipo');
    } else{
      this.tipo = 'restaurant';
    }
    console.log("home default: "+this.tipo);
  }

  // show all places
 viewPlaces() {
    this.navCtrl.push(PlacesPage);
  }

  // change the type
  setType(){    
     //this.service.getPlaces(this.type);
     localStorage.setItem('tipo', this.tipo);
     this.navCtrl.push(PlacesPage);   
}
  
  // begin map 
  initMap() {

    this.geolocation.getCurrentPosition({enableHighAccuracy:true, timeout:5000, maximumAge:0}).then((position) => {
    //Geolocation.watchPosition().subscribe((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      this.service.busca(lat, long);//print in service

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // console.log(lat,long);      // adiciona um ponto de localização ao local
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
      });

    }, (err) => {
      console.log(err);
    });

  }

}
