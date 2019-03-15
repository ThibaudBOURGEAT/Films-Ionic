import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { DescribePage } from '../../pages/describe/describe';
import { EpisodePage } from '../../pages/episode/episode';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  private medias: object;
  private episodes: object;  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private favorites: FavoritesProvider) {
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
