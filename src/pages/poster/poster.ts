import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';

@Component({
  selector: 'page-poster',
  templateUrl: 'poster.html',
})
export class PosterPage {

  film:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private omdb: OMDbApiProvider) {
      var id = navParams.get('id');
      this.getFilmById(id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PosterPage');
  }

  private getFilmById = (id:string) =>{
    this.omdb.getFilmById(id)
    .then((data)=>{
      console.log("poster",data);
      this.film = data;
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  public getFilm = () =>{
    return this.film;
  }
}
