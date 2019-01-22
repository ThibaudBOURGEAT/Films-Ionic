import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  film:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private omdb: OMDbApiProvider, private nativePageTransitions: NativePageTransitions) {
      this.film = navParams.get('film');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PosterPage');
  }

  public getFilm = () =>{
    return this.film;
  }

  public getPoster = () =>{
    return "http://img.omdbapi.com/?apikey=75522b56&i=" + this.film.imdbID;
  }

  public goBack = () =>{
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 600
    };

    this.nativePageTransitions.flip(options);
    this.navCtrl.pop();
  }
}
