import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FavoritesComponent} from './favorites/favorites.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {Router} from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {path: '', redirectTo: '/weather', pathMatch: 'full'},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'weather', component: WeatherComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private router: Router) {

   // const booleanPromise = this.router.navigate(['/weather']);
  }
}
