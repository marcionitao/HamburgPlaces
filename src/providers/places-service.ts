import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

declare var google: any;

@Injectable()
export class PlacesService {

  lat: number = 53.550513;
  lon: number = 9.994241;
  address: any;
  idPlace: any;
  onde: any;
  key: any = 'AIzaSyBWfyDuBv8M_UbnXQhqBVYMET-12HSSdA0';
  keyDirection: any = 'AIzaSyCWSMqhiuchsRJhfe3YjAlRNUhbNc9J7RI';

  baseUrl: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch';
  baseSearchUrl: string = "https://maps.googleapis.com/maps/api/place/textsearch";
  baseDirectionUrl: string = "https://maps.googleapis.com/maps/api/directions";
  detailsUrl: string = "https://maps.googleapis.com/maps/api/place/details/json?placeid=";

  constructor(public http: Http) {
    this.http = http;
  }

  getPlaces(tipo) {
    this.busca(this.lat, this.lon); // get my location and insert in URL
    return this.http.get(this.baseUrl + '/' + 'json?location=' + this.lat + ',' + this.lon + '&radius=500&type=' + tipo + '&key=' + this.key)
      .map(res => res.json())
      .toPromise();// executa uma function e retorna JSON
  }

  getSearch(tipo, onde) {
    console.log(this.baseSearchUrl + '/' + 'json?query=' + onde + '&radius=500&type=' + tipo + '&key=' + this.key);
    return this.http.get(this.baseSearchUrl + '/' + 'json?query=' + onde + '&radius=500&type=' + tipo + '&key=' + this.key)
      .map(res => res.json())
      .toPromise();// executa uma function e retorna JSON
  }

  getdetails(details) {
    return this.http.get(this.detailsUrl + details + '&key=' + this.key)
      .map(res => res.json())
      .toPromise();// executa uma function e retorna JSON
  }

  getDirections(idPlace) {
    this.busca(this.lat, this.lon); // get my location and insert in URL
    return this.http.get(this.baseDirectionUrl + '/' + 'json?origin=' + this.lat + ',' + this.lon + 'destination=place_id:' + idPlace + '&key=' + this.keyDirection)
      .map(res => res.json())
      .toPromise();// executa uma function e retorna JSON
  }

  // get my location origem
  busca(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    //console.log("lat: " + lat + ", long: " + lon);
  }

}
