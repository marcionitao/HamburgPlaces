import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
 Page about the App
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
