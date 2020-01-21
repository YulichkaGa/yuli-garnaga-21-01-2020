import { Component, OnInit } from '@angular/core';

import { AppService } from './../app-service';
import { Favorite } from '../app-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {

  listFavorites: Array<Favorite > = [];
  constructor(private appService: AppService) {

    this.listFavorites = this.getFromLocalStrorage();
    console.log( this.listFavorites);
   }

  ngOnInit() {
    this.listFavorites = this.getFromLocalStrorage();
    console.log( this.listFavorites);


  }

  public getFromLocalStrorage() {
    const  cart =  JSON.parse(localStorage.getItem('_f'));
    return cart;
  }
  deleteItem(idItem: any) {


      localStorage.setItem(
          '_f',
          JSON.stringify(
              JSON.parse(localStorage.getItem('_f')).filter((item: { City: any; }) => {
                  return item.City !== idItem;
              })
          )
      )
      location.reload();
      }

    }
