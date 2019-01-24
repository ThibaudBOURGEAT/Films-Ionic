import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public films:any;

  constructor(private omdb: OMDbApiProvider,
    private alertCtrl: AlertController) {
    this.getManyFilms(10);
    console.log("construct");
  }

  public getManyFilms(nbFilms:Number){
    this.omdb.getManyFilms(nbFilms)
    .then((data)=>{
      this.films = data;
      console.log(this.films);
    })
    .catch((err)=>{
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: 'Impossible de récuperer les actualités!',
        buttons: ['OK']
      });
      alert.present();
      console.error(err);
    });
  }

}
