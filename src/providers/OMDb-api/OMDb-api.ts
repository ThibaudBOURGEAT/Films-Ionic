import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OMDbApiProvider {

  private urlAPIFilm: String = "http://www.omdbapi.com/?apikey=75522b56&plot=full&";
  private urlAPIPoster: String = "http://img.omdbapi.com/?apikey=75522b56&";

  constructor(private http: HttpClient) {
  }

  public getMediaById = (id: string) => {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlAPIFilm + "i=" + id)
        .subscribe((data) => {
          if (data['Response'] == "True") {
            this.getPosterById(data['imdbID'])
                .then((poster) => {
                  data['Poster'] = poster;
                })
                .catch((err) => {
                  if(data['Poster'] == "N/A"){
                    data['Poster'] = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/768px-Pas_d%27image_disponible.svg.png";
                  } 
                });
          }
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getPosterById = (id: string) => {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlAPIPoster + "i=" + id,
        { responseType: 'blob' })
        .subscribe((data) => {
          resolve(this.urlAPIPoster + "i=" + id);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getMedias = (title: string, media: string) => {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlAPIFilm + "type=" + media + "&s=" + title)
        .subscribe((data) => {
          if (data['Response'] == "True") {
            data['Search'].forEach(media => {
              this.getPosterById(media['imdbID'])
                .then((poster) => {
                  media['Poster'] = poster;
                })
                .catch((err) => {
                  if(media['Poster'] == "N/A"){
                    media['Poster'] = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/768px-Pas_d%27image_disponible.svg.png";
                  } 
                });
            });
          }
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getSaisonByNumberOfSerie = (id: string, nbSaison: number) =>{
    return new Promise((resolve, reject) =>{
      this.http.get(this.urlAPIFilm + "i=" + id + "&Season=" + nbSaison)
      .subscribe((data) =>{
        resolve(data);
      },(err) =>{
        reject(err);
      })
    });
  }
}
