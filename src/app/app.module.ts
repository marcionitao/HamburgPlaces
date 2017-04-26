import { GoPlacesPage } from './../pages/go-places/go-places';
import { AboutPage } from './../pages/about/about';
import { SearchPage } from './../pages/search/search';
import { PlacesPage } from './../pages/places/places';
import { MenuPage } from './../pages/menu/menu';
import { SearchPlacesPage } from './../pages/search-places/search-places';
import { PlacesService } from './../providers/places-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

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
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
  { provide: PlacesService, useClass: PlacesService }]
})
export class AppModule { }
