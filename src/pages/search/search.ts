import { SearchPlacesPage } from './../search-places/search-places';
//  import { PlacesPage } from './../places/places';
import { PlacesService } from './../../providers/places-service';

import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google: any;

/**
 * In this page we define two search options. Wo? Und Was? And we present a map
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild('map') mapElement;

  map: any;
  marker: any;
  search: any;
  items: any;

  tipo: string;
  onde: string;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private platform: Platform,
    public viewCtrl: ViewController,
    private service: PlacesService
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
  getDefaults() {
    if (localStorage.getItem('onde') != null) {
      this.onde = localStorage.getItem('onde');
    } else {
      this.onde = 'st.pauli';
    }
    if (localStorage.getItem('tipo') != null) {
      this.tipo = localStorage.getItem('tipo');
    } else {
      this.tipo = 'restaurant';
    }
    console.log("search default: " + this.tipo);
    console.log("search default: " + this.onde);
  }

  // show all places
  viewPlaces() {
    this.navCtrl.push(SearchPlacesPage);
  }
/*
   getPlaces(tipo, onde) {
    this.service.getSearch(tipo, onde).then(    
      response => {
       //console.log(response.results)
       console.log(response),
       this.items = response.results
      });
  }
*/
  /* changeType(){
     
     this.getPlaces(this.tipo, this.onde);
    // localStorage.setItem('tipo', this.tipo);
   //  this.navCtrl.push(PlacesPage);   
     console.log("home changeType: "+this.tipo);
   }*/

  // change the type
  setType() {
    //this.service.getPlaces(this.type);
    localStorage.setItem('tipo', this.tipo);
    localStorage.setItem('onde', this.onde);
    this.navCtrl.push(SearchPlacesPage);
  }

  // begin map 
  initMap() {

    Geolocation.getCurrentPosition({enableHighAccuracy:true, timeout:5000, maximumAge:0}).then((position) => {
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