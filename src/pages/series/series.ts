import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {

  private displaySearchbar: boolean;
  private series: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public DisplaySearchbar = () =>{
    return this.displaySearchbar;
  }

  public setDisplaySearchbar = () =>{
    if(this.displaySearchbar){
      this.displaySearchbar = false;
    } else {
      this.displaySearchbar = true;
    }
  }
}
