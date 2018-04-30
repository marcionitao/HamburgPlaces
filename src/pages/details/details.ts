import { GoPlacesPage } from './../go-places/go-places';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { PlacesService } from '../../providers/places-service';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})

export class Details {
 item: any; // recebe apenas o id do local
 items: any; // recebe todos os dados json referente aos Details
 website:any; // info about website
 phone:any;  // info about phone
 comments:any;
 directions:any;
 duration: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private service: PlacesService,) {

    platform.ready().then(() => {
      this.item = navParams.get('item'); // irá possibilitar trazer os parametros de item ao involcar a DetailsPage
      this.getDetails(this.item.place_id); // pega o id do local lá do json e passa por parametro
      this.getDirections(this.item.place_id);// pega o id do local lá do json e passa por parametro para encontrar a direcção
  
  })
  }

  getDetails(details) {
    this.service.getdetails(details).then(
      response => {
          console.log( response.result),
          this.phone = response.result.international_phone_number,
          this.website = response.result.website,
          this.comments = response.result.reviews,
          this.items = response.result
      });
  }

   // Show Route in map for each item 
  goPlace(item) {
    this.navCtrl.push(GoPlacesPage, {
      item: item
    });
  }
 // Get time and distance in Km
   getDirections(idPlace){
     this.service.getDirections(idPlace).then(
      response => {   
        console.log(response),
        //console.log(response),
          this.directions = response.routes[0].legs[0].distance.text,
          this.duration = response.routes[0].legs[0].duration.text
      });
   } 
}
