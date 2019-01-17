import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private omdb: OMDbApiProvider,
    private alertCtrl: AlertController) {

    console.log("construct");
  }

  ngOnInit() {
    this.getManyFilms(10);
  }

  public getManyFilms(nbFilms:Number){
    this.omdb.getManyFilms(nbFilms)
    .then((data)=>{
      console.log(data);
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
