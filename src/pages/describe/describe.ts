import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Serie } from '../../models/serie';
import { Movie } from  '../../models/movie';
import { SaisonPage } from '../saison/saison';

@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  private media:object;
  private typeMedia: string;
  private saisons: number[];

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
      console.log("serie",this.media);
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
    this.media = new Serie(serie);
    this.saisons = new Array();
    for(let i = 0 ; i < this.media['totalSeasons'] ; i++){
      this.saisons.push(i);
    }  
  }

  public goBack = () =>{
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 600
    };
    this.nativePageTransitions.flip(options);
    this.navCtrl.pop();
  }

  public goToSaison = (id:string, num: number) =>{
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 600
    };
    this.nativePageTransitions.flip(options);
    this.navCtrl.push(SaisonPage, {id: id, num:num});
  }
}
