import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { Episode } from '../../models/episode';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
})
export class EpisodePage {

  private id: string; 
  private episode: Episode;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private omdb: OMDbApiProvider,
    private alertCtrl: AlertController) {
      this.id = this.navParams.get('id');
      this.getEpisode();
  }

  private getEpisode = () =>{
    this.omdb.getEpisodeById(this.id)
    .then((episode)=>{
      this.episode = new Episode(episode);
    })
    .catch((err) =>{
      console.log("getEpisode", err);
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: "Impossible de récuperer les informations de l'oeuvre !",
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
