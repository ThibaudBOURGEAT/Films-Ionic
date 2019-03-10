import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  private media:any;
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
      console.log("media", media);
      this.media = media; 
    })
    .catch((err) =>{
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: "Impossible de récuperer les informations de l'oeuvre !",
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
