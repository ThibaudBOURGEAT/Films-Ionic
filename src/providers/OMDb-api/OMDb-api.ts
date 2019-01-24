import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getRandomID } from '../../helpers/randomID';

/*
  Generated class for the OmDbApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OMDbApiProvider {

  private urlAPIFilm:String = "http://www.omdbapi.com/?apikey=75522b56&";
  private urlAPIPoster:String = "http://img.omdbapi.com/?apikey=75522b56&";

  constructor(private http: HttpClient) {
  }

  public getManyFilms(nbFilm:Number){
    return new Promise((resolve,reject)=>{
      var films = [];
      for(var i = 0; i < nbFilm; i++){
        this.getFilmById("tt" + getRandomID().toString())
        .then((data)=>{
           this.getPosterById(data.imdbID)
           .then((poster) =>{
             data.Poster = poster;
             films.push(data);
           })
           .catch((err) =>{
             if(data.Poster == "N/A"){
               data.Poster = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/768px-Pas_d%27image_disponible.svg.png";
             }
             films.push(data);
           })
           .then(() =>{
             if(films.length == nbFilm){resolve(films);}
           });
        })
        .catch((err)=>{ reject(err) });
      }
    });
  }

  public getFilmById = (id:string) =>{
    return new Promise((resolve, reject) =>{
      this.http.get(this.urlAPIFilm + "i=" + id)
      .subscribe((data)=>{
        resolve(data);
      },(err)=>{
        reject(err);
      });
    });
  }

  public getPosterById = (id: string) =>{
    return new Promise((resolve, reject)=>{
      this.http.get(this.urlAPIPoster + "i=" + id ,
      { responseType: 'blob' })
      .subscribe((data)=>{
        resolve(this.urlAPIPoster + "i=" + id);
      }, (err)=>{
        reject(err);
      });
    });
  }

}
