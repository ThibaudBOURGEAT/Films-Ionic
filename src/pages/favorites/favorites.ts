import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { DescribePage } from '../../pages/describe/describe';
import { EpisodePage } from '../../pages/episode/episode';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  private medias: object;
  private episodes: object;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private favorites: FavoritesProvider,
    private alertCtrl: AlertController
    ) {
  }

  public exportFavorites = (format: string) =>{
    this.favorites.exportFavorites(format)
    .then(() =>{
      const alert = this.alertCtrl.create({
        title: 'Réussie !',
        subTitle: "Favoris exportés !",
        buttons: ['OK']
      });
      alert.present();
    })
    .catch((err)=>{
      console.log("exportFavorites", err);
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: "Impossible d'exporter les favoris !",
        buttons: ['OK']
      });
      alert.present();
    });
  }

  public importFavorites = (format: string) =>{
    this.favorites.importFavorites()
    .then(()=>{
      //TODO reload page
      const alert = this.alertCtrl.create({
        title: 'Réussie !',
        subTitle: "Favoris importés !",
        buttons: ['OK']
      });
      alert.present();
    })
    .catch((err)=>{
      console.log("importFavorites", err);
      const alert = this.alertCtrl.create({
        title: 'Erreur !',
        subTitle: "Impossible d'importer les favoris !",
        buttons: ['OK']
      });
      alert.present();
    });
  }

  ionViewDidEnter(){
    this.getMedias();
    this.getEpisodes();
  }

  private getMedias = () =>{
    this.favorites.getAllMedias()
    .then((medias) =>{
      this.medias = medias; 
    });
  }

  private getEpisodes = () =>{
    this.favorites.getAllEpisodes()
    .then((episode) =>{
      this.episodes = episode;
    });
  }

  public goToDescribeOfMedia = (id:string) =>{
    this.navCtrl.push(DescribePage,{id:id});
  }

  public goToEpisode(id: string){
    this.navCtrl.push(EpisodePage, {id: id});
  }
}
