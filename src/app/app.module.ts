import { GoPlacesPage } from './../pages/go-places/go-places';
import { AboutPage } from './../pages/about/about';
import { SearchPage } from './../pages/search/search';
import { PlacesPage } from './../pages/places/places';
import { MenuPage } from './../pages/menu/menu';
import { SearchPlacesPage } from './../pages/search-places/search-places';
import { PlacesService } from './../providers/places-service';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacesPage,
    MenuPage,
    SearchPage,
    AboutPage,
    SearchPlacesPage,
    GoPlacesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacesPage,
    MenuPage,
    SearchPage,
    AboutPage,
    SearchPlacesPage,
    GoPlacesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: PlacesService, useClass: PlacesService }]
})
export class AppModule { }
