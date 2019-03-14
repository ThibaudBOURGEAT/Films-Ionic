import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { EpisodePage } from '../../pages/episode/episode';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';

@Component({
  selector: 'page-saison',
  templateUrl: 'saison.html',
})
export class SaisonPage {

  private id : string;
  private saison: object;
  private num: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private alertCtrl: AlertController,
    private omdb: OMDbApiProvider) {
      this.id = navParams.get('id');
      this.num = navParams.get('num');
      this.getSaison()
  }

  public goToEpisode(id: string){
    this.navCtrl.push(EpisodePage, {id: id});
  }

  private getSaison = () =>{
    this.omdb.getSaisonByNumberOfSerie(this.id, this.num)
    .then((saison)=>{
      this.saison = saison;
    })
    .catch((err)=>{
      console.log("getSaison", err);
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: "Impossible de récuperer les informations de l'oeuvre !",
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
