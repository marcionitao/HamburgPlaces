import { AboutPage } from './../about/about';
import { SearchPage } from './../../pages/search/search';
import { Platform, NavParams } from 'ionic-angular';
import { HomePage } from './../../pages/home/home';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

// In this page we define the actions for MenuToggle. We still define the items and CSS

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  
  private rootPage;
  private homePage;
  private searchPage;
  private aboutPage;


    //rootPage = HomePage;

  constructor(private platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams) {

    this.rootPage = HomePage; // this page begin first
    this.homePage = HomePage;
    this.searchPage = SearchPage;
    this.aboutPage = AboutPage;

  }

  openPage(page) {
    this.rootPage = page; // page send to rootPage
  }

  exit() {
    this.platform.exitApp();
    console.log("foi executado!!");
  }
}
