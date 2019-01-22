import { Component } from '@angular/core';
import { AlertController, Events, NavController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { DescribePage } from '../describe/describe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private displaySearchbar:boolean;
  private films:any;

  constructor(private omdb: OMDbApiProvider,
    private alertCtrl: AlertController, private events: Events,
    private navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
      this.displaySearchbar = false;
      this.onDisplaySearchbar();
      this.getManyFilms(10);
      console.log("HOME");
    }

    public searchFilms = (ev: any) =>{
      const val = ev.target.value;
      if (val && val.trim() != '' && this.films != null) {
        this.films = this.films.filter((film) => {
          return (film.Title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }

    private onDisplaySearchbar = () =>{
      this.events.subscribe('displaySearchbar', (res) => {
        this.displaySearchbar = res;
      });
    }

    public goToPosterOfFilm = (film: any) =>{
      let options: NativeTransitionOptions = {
        direction: 'left',
        duration: 600
      };

      this.nativePageTransitions.flip(options);
      this.navCtrl.push(DescribePage, {film: film});
    }

    public getPoster = (id:string) =>{
      return "http://img.omdbapi.com/?apikey=75522b56&i=" + id;
    }

    public getDisplaySearchbar = () =>{
      return this.displaySearchbar;
    }

    public getFilms = () =>{
      return this.films;
    }

    public getManyFilms = (nbFilms:Number) =>{
      this.omdb.getManyFilms(nbFilms)
      .then((data)=>{
        console.log(data);
        this.films = data;
      })
      .catch((err)=>{
        const alert = this.alertCtrl.create({
          title: 'Erreur !',
          subTitle: 'Impossible de récuperer les actualités !',
          buttons: ['OK']
        });
        alert.present();
        console.error(err);
      });
    }

  }
