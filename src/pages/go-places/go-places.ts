//import { HomePage } from './../home/home';
//import { PlacesPage } from './../places/places';
import { PlacesService } from './../../providers/places-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/*
  On this page we obtain a map and a route between Eu and the establishment from PlacesPage
*/
declare var google: any;

@Component({
  selector: 'page-go-places',
  templateUrl: 'go-places.html'
})

export class GoPlacesPage {

  @ViewChild('map') mapElement;

  map: any;
  item: any;
  destino: any;
  myOrigem: any; // actual location
  mode: any;
  onde: any;
  origem: any; // get lat, lon from Address
  watch: any;
  marker: any;
  unitSystem: any;

  directionsDisplay: any;
  directionsService: any;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private platform: Platform,
    public viewCtrl: ViewController,
    private service: PlacesService,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {

    platform.ready().then(() => {
      this.item = navParams.get('item'); // irá possibilitar trazer os parametros de item ao involcar a DetailsPage
      this.initMap();
     // console.log("valor do item enviado: "+this.item);
    })
  }

  dismiss() {
    // this.viewCtrl.dismiss();
    this.viewCtrl.dismiss().catch(() => { });
  }

  // begin map 
  initMap() {
    // define mode as default DRIVING
    this.mode = 'DRIVING';
    this.directionsService = new google.maps.DirectionsService();

    // get per params lat and long from PlacesPage.ts
    let lt = this.item.geometry.location.lat;
    let lo = this.item.geometry.location.lng;

    console.log(lt+" - "+lo);
    // define destino
    this.destino = new google.maps.LatLng(lt, lo);

    //-----------begin origem-----------------------------------
    // Pass onde per params from SearchPlaces
    /*this.onde = this.navParams.get('onde');

    let address = this.onde;
    let geocoder = new google.maps.Geocoder();
    console.log(this.onde);
    // get address and tranformer in lat, lon
    geocoder.geocode({ 'address': address }, (results, status) => {
      let lat = results[0].geometry.location.lat();
      let lon = results[0].geometry.location.lng();
      this.origem = new google.maps.LatLng(lat, lon);
     
    });
*/
    //--------------------end origem---------------------------

    // get my location
   this.geolocation.getCurrentPosition({enableHighAccuracy:false, timeout:3000, maximumAge:0}).then((position) => {
    //this.geolocation.watchPosition({enableHighAccuracy: false, timeout: 3000, maximumAge: 0 }).subscribe((position) => {
     // this.onde = "home";
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      this.myOrigem = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(this.myOrigem);
      let mapOptions = {
        center: this.origem,
        zoom: 13,
        animation: google.maps.Animation.DROP,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsDisplay.setMap(this.map);
      
     // this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
      // call function for calc route
      this.calcRoute();

      // update my location in walking
    /*  this.watch = this.geolocation.watchPosition().subscribe((position) => {
        this.marker = new google.maps.Marker({
            position: this.origem,
            map: this.map,
          });
      });*/
    });
    
  }

  // calc e trace route
  calcRoute() {
    let myhome = this.myOrigem;
    let path = this.origem;
    let selectedMode = this.mode;

    // Condition for validate which maps-route show. MyLocation or outro Adress
    if (this.onde !== undefined) {
      console.log("valor de onde: "+this.onde);
      let request = {
        /* origin: {'placeId': origin_place_id},
         destination: {'placeId': destination_place_id},*/
        // origin: this.myOrigem,
        origin: path,
        destination: this.destino,
        travelMode: selectedMode,
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL

      };
      this.directionsService.route(request, (response, status) => {
        if (status == 'OK') {
          this.directionsDisplay.setDirections(response);
        }
      });
    } else if (this.onde === undefined) {
      let request = {
        origin: myhome,
        destination: this.destino,
        travelMode: selectedMode,
        provideRouteAlternatives: true,

      };
      this.directionsService.route(request, (response, status) => {
        if (status == 'OK') {
          this.directionsDisplay.setDirections(response);
        }
      });
    }

  }
 
  // Return to homePage  
  retunrHome() {
   // this.watch.unsubscribe();
    this.navCtrl.popToRoot();
  }

}
