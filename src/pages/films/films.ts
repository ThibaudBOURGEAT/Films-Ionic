import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { DescribePage } from '../describe/describe';

@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class FilmsPage {

  private displaySearchbar: boolean;
  private films: any;

  constructor(private omdb: OMDbApiProvider,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private events: Events,
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions) {
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

  private Films = () => {
    return this.films;
  }

  public goToDescribeOfFilm = (id:string) =>{
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 600
    };

    this.nativePageTransitions.flip(options);
    this.navCtrl.push(DescribePage, {id: id});
  }

  private getFilmsFromAPI = (title: string) => {
    this.omdb.getFilms(title)
      .then((films) => {
        this.films = films['Search'];
      })
      .catch((err) => {
        const alert = this.alertCtrl.create({
          title: 'Erreur !',
          subTitle: 'Impossible de récuperer les films !',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  public searchFilms = (ev: any) => {
    const val = ev.target.value;
    console.log("val",val);
    if (val && val.trim() != '') {
      this.omdb.getFilms(val)
        .then((films) => {
          console.log("films", films);
          this.films = films['Search'];
          console.log("films", this.films);
        })
        .catch((err) => {
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
