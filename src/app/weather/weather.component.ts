import {AppService, Favorite} from '../app-service';
import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})



export class WeatherComponent implements OnInit {
  constructor(private appService: AppService) {
    // tslint:disable-next-line: deprecation
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.searchLocation(token))
      );
  
  }
  dataSource: Observable<any[]>;
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  selectedItem: any;
  selectedWeather: any;

  lastDays: any;
  fiveWeathers: any[];
  listFavorites: Array<Favorite> = [];
  nameCity: any;
  index: any;


  ngOnInit() {
    this.index = 0;
    this.appService.getWeather(215854).subscribe(data => {
      this.selectedWeather = data[0];
    


    });
    this.nameCity = 'Tel Aviv';
    this.appService.lastDays(215854).subscribe(data => {
      this.lastDays = data;
      localStorage.setItem(this.selectedItem, JSON.stringify(this.lastDays));
      this.fiveWeathers = this.lastDays.DailyForecasts;
    });

  }
  searchLocation(text: string): Observable<any> {

    return this.appService.autoComplete(text);
  }

  changeTypeaheadLoading(e: boolean): void {

    this.typeaheadLoading = e;
  }
  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.selectedItem = e.item;
    this.appService.getWeather(this.selectedItem.Key).subscribe(data => {
      this.selectedWeather = data[0];
      localStorage.setItem(this.selectedItem, JSON.stringify(this.selectedWeather));
      this.nameCity = e.value;
    });



    this.appService.lastDays(this.selectedItem.Key).subscribe(data => {
      this.lastDays = data;
      this.fiveWeathers = this.lastDays.DailyForecasts;
    
     

    });
  }
  toSaveFavorites() {

    try{
    this.index++;
    const favObj = new Favorite(this.index, this.selectedWeather.LocalObservationDateTime, this.nameCity,
    this.selectedWeather.Temperature.Metric.Value, this.selectedWeather.Temperature.Metric.Unit, this.selectedWeather.WeatherIcon);

    const favObjFive= new Favorite(this.index, this.lastDays.Date, this.nameCity,'','','');      
    this.appService.listFavorites.push(favObj);
    localStorage.setItem('_f', JSON.stringify(this.appService.listFavorites));

    this.appService.fiveWeathersList.push(favObjFive);    
    localStorage.setItem('_fivieWeathers', JSON.stringify(this.appService.fiveWeathersList));
    }
    catch(error){
      
    }
    

  }
}







