import { MenuPage } from './../pages/menu/menu';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = MenuPage;

  constructor(private splashScreen: SplashScreen,
    private platform: Platform,
    private statusBar: StatusBar) {
    platform.ready().then(() => {
      this.splashScreen.show();
      this.statusBar.show();
    })
  }
}
