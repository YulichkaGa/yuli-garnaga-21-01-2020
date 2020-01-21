import { FavoritesComponent } from './favorites/favorites.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { error } from 'util';
import { catchError } from 'rxjs/operators';

export interface IFavorite {
  Id: string;
  Date: string;
  City: string;
  TemperatureValue: string;
  TemperatureUnit: string;
  Icon: string;
}
export class Favorite implements  IFavorite {
  Id: string;
  Date: string;
  City: string;
  TemperatureValue: string;
  TemperatureUnit: string;
  Icon: string;
  public constructor(Id: string, Date: string, City: string, TemperatureValue: string, TemperatureUnit: string, Icon: string ) {
    this.Id = Id;
    this.Date = Date;
    this.City = City;
    this.TemperatureValue = TemperatureValue;
    this.TemperatureUnit = TemperatureUnit;
    this. Icon =  Icon;
  }


}

const favorites: IFavorite[] = [
  {
    Id: '0',
    Date: '24-02-2018',
    City: 'Tel-Aviv',
    TemperatureValue: '40',
    TemperatureUnit: 'C',
    Icon: '/src/assets/elka1.png'
  }];



@Injectable({
  providedIn: 'root'
})
export class AppService {
  // tslint:disable-next-line: variable-name
  public constructor(  private http: HttpClient) {
     this.getWeather('2332712');

   }
 public  listFavorites: Array<Favorite> = [];

 public fiveWeathersList: any[];



  getWeather(id): Observable<any> {
    const link = `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=	NMaRicn5sLbdD9ivnivWcShHbFN0VTXj`;
    return this.http.get<any>(link).pipe(
      catchError(this.handleError)
      );;
  }

  lastDays(id: any): Observable<any[]> {

    const link = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=NMaRicn5sLbdD9ivnivWcShHbFN0VTXj`;
    return this.http.get<any[]>(link).pipe(
      catchError(this.handleError)
      );
  }

  autoComplete(text: string): Observable<any[]> {

    const link = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=	NMaRicn5sLbdD9ivnivWcShHbFN0VTXj&q=${text}`;

    return this.http.get<any[]>(link).pipe(
      catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse){
   
    console.log('Error:',error);
    return throwError(error);
  }
  forecast() {

  }
  
}
