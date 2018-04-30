import { GoPlacesPage } from './../go-places/go-places';
// import { HomePage } from './../home/home';
import { PlacesService } from './../../providers/places-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/*
  On this page we get a list of establishments close to me. It is the result made in SearchPage
*/
@Component({
  selector: 'page-search-places',
  templateUrl: 'search-places.html'
})

export class SearchPlacesPage {
  
  items: any;
  tipo: string;
  onde: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: PlacesService,
    private platform: Platform, 
    private alertCtrl: AlertController) {

    platform.ready().then(() => {
      this.getDefaults();
      this.getPlaces(this.tipo, this.onde);

      // this.service.geoCode();
    })

  }
  // value pré-default to type
  getDefaults() {
    if (localStorage.getItem('onde') !== null) {
      this.onde = localStorage.getItem('onde');
    } else {
      this.onde = 'st.pauli';
    }
    if (localStorage.getItem('tipo') !== null) {
      this.tipo = localStorage.getItem('tipo');
    } else {
      this.tipo = 'restaurant';
    }
  
  }

  getPlaces(tipo, onde) {
    this.service.getSearch(tipo, onde).then(
      response => {
         if (response.results.length === 0) {
          this.presentAlert(tipo);
          this.navCtrl.pop();
        }
        console.log(response.results),
          this.items = response.results
      });
  }

  changeType() {
    this.getPlaces(this.tipo, this.onde);
    // localStorage.setItem('tipo', this.tipo);
    //  this.navCtrl.push(PlacesPage);   
  }

   // Show Route in map for each item 
  goPlace(item) {
    this.navCtrl.push(GoPlacesPage, {
      item: item,
      onde: this.onde
    });
     
  }

   // Show a msg Box as Tipo not found!
  presentAlert(tipo) {
    let alert = this.alertCtrl.create({
      title: tipo,
      subTitle: 'Leider, Diese Art ist nicht an diesem Speicherort vorhanden. Legen Sie eine neue Art',
      buttons: ['Ok']
    });
    alert.present();
  }

}
