import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { DescribePage } from '../describe/describe';

@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  private displaySearchbar: boolean;
  private medias: any;
  private typeMedia: string;

  constructor(private omdb: OMDbApiProvider,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions) {
  }

  ionViewDidEnter(){
    this.typeMedia = this.navParams.data;
  }

  public DisplaySearchbar = () =>{
    return this.displaySearchbar;
  }

  public setDisplaySearchbar = () =>{
    if(this.displaySearchbar){
      this.displaySearchbar = false;
    } else {
      this.displaySearchbar = true;
    }
  }

  private Medias = () => {
    return this.medias;
  }

  public goToDescribeOfMedia = (id:string) =>{
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 600
    };

    this.nativePageTransitions.flip(options);
    this.navCtrl.push(DescribePage, {id: id, typeMedia: this.typeMedia});
  }

  public searchMedias = (ev: any) => {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.omdb.getMedias(val, this.typeMedia)
        .then((medias) => {
          this.medias = medias['Search'];
        })
        .catch((err) => {
          console.log("searchMedias", err);
          const alert = this.alertCtrl.create({
            title: 'Erreur !',
            subTitle: 'Impossible de récuperer les films !',
            buttons: ['OK']
          });
          alert.present();
        });
    }
  }

}
