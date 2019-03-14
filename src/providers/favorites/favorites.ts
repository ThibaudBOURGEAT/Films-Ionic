import { HttpClient } from '@angular/common/http';
import { Injectable, Testability } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Media } from '../../models/media';
import { Episode } from '../../models/episode';
import { Serie } from '../../models/serie';
import { Movie } from '../../models/movie';

@Injectable()
export class FavoritesProvider {

  private medias: Media[];
  private episodes: Episode[];

  constructor(public http: HttpClient,
    private storage: Storage) {
      this.storage.clear()
      this.medias = new Array();
      this.episodes = new Array();
      this.storage.get('medias')
      .then((medias)=>{
        if(medias != null){
          this.medias = medias;
        }
      });
      this.storage.get('episodes')
      .then((episodes)=>{
        if(episodes != null){
          this.episodes = episodes;
        }
      });
  }

  public getAllMedias = () =>{
    return new Promise((resolve) =>{
      this.storage.get('medias')
      .then((medias) =>{
        resolve(medias);
      });
    });
  }

  public getAllEpisodes = () =>{
    return new Promise((resolve) =>{
      this.storage.get('episodes')
      .then((episodes) =>{
        resolve(episodes);
      });
    });
  }

  public checkMediaExist = (media: object) =>{
    let exist: boolean = false;
    this.medias.forEach((value)=>{
      if(value['id'] == media['id']){
        exist = true;
      }
    });
    return exist;
  }

  public checkEpisodeExist = (episode: object) =>{
    let exist: boolean = false;
    this.episodes.forEach((value)=>{
      if(value['id'] == episode['id']){
        exist = true;
      }
    });
    return exist;
  }

  public addMedia = (media:Media) =>{
    if(!this.checkMediaExist(media)){
      this.medias.push(media);
      this.storage.set('medias', this.medias);
    }   
  }

  public addEpisode = (episode:Episode)=>{
    if(!this.checkEpisodeExist(episode)){
      this.episodes.push(episode);
      this.storage.set('episodes', this.episodes);
    } 
  }

  public removeMedia = (media:Media) =>{
    this.medias.forEach((value,index) => {
      if(value['id'] == media['id']){
        this.medias.splice(index,1);
      }
    });
    this.storage.set('medias', this.medias);
  }

  public removeEpisode = (episode:Episode)=>{
    this.episodes.forEach((value,index) => {
      if(value['id'] == episode['id']){
        this.episodes.splice(index,1);
      }
    });
    this.storage.set('medias', this.episodes);
  }
}
