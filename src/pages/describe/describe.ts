import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Serie } from '../../models/serie';
import { Movie } from  '../../models/movie';
import { Episode } from '../../models/episode';

@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  private media:object;
  private typeMedia: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private nativePageTransitions: NativePageTransitions,
    private omdb: OMDbApiProvider) {
      let id = navParams.get('id');
      this.typeMedia = navParams.get('typeMedia');
      this.getMedia(id);
  }

  public Media = () =>{
    return this.media;
  }

  private getMedia = (id:string) =>{
    this.omdb.getMediaById(id)
    .then((media) =>{
      if(this.typeMedia == "movie"){
        this.media = new Movie(media);
      } else {
        this.getSaisons(media);
      }
    })
    .catch((err) =>{
      console.log("getMedia", err);
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: "Impossible de récuperer les informations de l'oeuvre !",
        buttons: ['OK']
      });
      alert.present();
    })
  }

  private getSaisons = (serie:object) =>{
    let lenght = Number(serie['totalSeasons']);
    let saisons: Episode[][] = new Array();
    for(let i:number = 0; i < lenght; i++){
      this.omdb.getSaisonByNumberOfSerie(serie['imdbID'],i+1)
      .then((value) => {
        let saison: Episode[] = new Array();
        value['Episodes'].forEach(epi => {
          let episode = new Episode(epi);
          saison.push(episode);
        });
        saisons.push(saison);
      })
      .catch((err) =>{
        console.log("getSaisons", err);
        const alert = this.alertCtrl.create({
          title: 'Erreur !',
          subTitle: "Impossible de récuperer les informations de la saison "+ i+1 +" !",
          buttons: ['OK']
        });
        alert.present();
      });
    }
    this.media = new Serie(serie, saisons);
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
