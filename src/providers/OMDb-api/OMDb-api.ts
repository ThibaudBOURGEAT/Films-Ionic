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

  private urlAPI:String = "http://www.omdbapi.com/?apikey=75522b56&i=";

  constructor(private http: HttpClient) {
  }

  public getManyFilms(nbFilm:Number){
    return new Promise((resolve,reject)=>{
      var films = [];
      for(var i = 0; i < nbFilm; i++){
        this.getFilmById("tt" + getRandomID().toString())
        .then((data)=>{ films.push(data); })
        .catch((err)=>{ reject(err) })
        .then(()=>{
          if(films.length == nbFilm){resolve(films);}
        });
      }
    });
  }

  public getFilmById(id:string){
    return new Promise((resolve, reject) =>{
      this.http.get(this.urlAPI + id)
      .subscribe((data)=>{
        resolve(data);
      },(err)=>{
        reject(err);
      });
    });
  }
}
