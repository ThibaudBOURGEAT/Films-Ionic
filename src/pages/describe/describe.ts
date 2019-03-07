import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  film:any;
  poster:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private nativePageTransitions: NativePageTransitions,
    private omdb: OMDbApiProvider) {
      let id = navParams.get('id');
      this.getFilm(id);
  }

  public Film = () =>{
    return this.film;
  }

  private getFilm = (id:string) =>{
    this.omdb.getFilmById(id)
    .then((film) =>{
      this.film = film; 
    })
    .catch((err) =>{
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: 'Impossible de récuperer les informations du film !',
        buttons: ['OK']
      });
      alert.present();
    })
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
