// import { HomePage } from './../home/home';
import { GoPlacesPage } from './../go-places/go-places';
import { PlacesService } from './../../providers/places-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  On this page we get a list of establishments close to me. It is the result made in HomePage
*/

@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage {

  items: any;
  tipo: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: PlacesService,
    private platform: Platform,
    private alertCtrl: AlertController) {

    platform.ready().then(() => {
      this.getDefaults();
      this.getPlaces(this.tipo);

      // this.service.geoCode();
    })

  }
  // value pré-default to type
  getDefaults() {
    if (localStorage.getItem('tipo') != null) {
      this.tipo = localStorage.getItem('tipo');
    } else {
      this.tipo = 'restaurant';
    }
    console.log("places default: " + this.tipo);
  }

  // get all places and show in home.ts
  getPlaces(tipo) {
    this.service.getPlaces(tipo).then(
      response => {
        //Validate tipo, if tipo == empty return HomePage for new search
        if (response.results.length === 0) {
          this.presentAlert(tipo);
          this.navCtrl.popToRoot();
        }
        console.log(response.results),
          this.items = response.results
      });

  }

  // Show Route in map for each item 
  goPlace(item) {
    this.navCtrl.push(GoPlacesPage, {
      item: item
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
