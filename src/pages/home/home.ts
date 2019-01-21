import { Component } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private displaySearchbar:boolean;
  private films:any;

  constructor(private omdb: OMDbApiProvider,
    private alertCtrl: AlertController, private events: Events) {
      this.displaySearchbar = false;
      this.onDisplaySearchbar();
    }

    ngOnInit() {
      this.getManyFilms(10);
    }

    private onDisplaySearchbar = () =>{
      this.events.subscribe('displaySearchbar', (res) => {
        console.log('displaySearchbar', res);
        this.displaySearchbar = res;
      });
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
          subTitle: 'Impossible de récuperer les actualités!',
          buttons: ['OK']
        });
        alert.present();
        console.error(err);
      });
    }

  }
