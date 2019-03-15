import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { OMDbApiProvider } from '../../providers/OMDb-api/OMDb-api';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Serie } from '../../models/serie';
import { Movie } from '../../models/movie';
import { Media } from '../../models/media';
import { SaisonPage } from '../saison/saison';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-describe',
  templateUrl: 'describe.html',
})
export class DescribePage {

  private media: Media;
  private typeMedia: string;
  private saisons: number[];
  private fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private nativePageTransitions: NativePageTransitions,
    private omdb: OMDbApiProvider,
    private favorites: FavoritesProvider,
    private transfer: FileTransfer,
    private file: File) {
    let id = navParams.get('id');
    this.typeMedia = navParams.get('typeMedia');
    this.getMedia(id);
    this.fileTransfer = this.transfer.create();
    console.log("file", this.file.dataDirectory);
  }

  public Media = () => {
    return this.media;
  }

  private getMedia = (id: string) => {
    this.omdb.getMediaById(id)
      .then((media) => {
        if (this.typeMedia == "movie") {
          this.media = new Movie(media);
        } else {
          this.getSaisons(media);
        }
      })
      .catch((err) => {
        console.log("getMedia", err);
        const alert = this.alertCtrl.create({
          title: 'Erreur !',
          subTitle: "Impossible de récuperer les informations de l'oeuvre !",
          buttons: ['OK']
        });
        alert.present();
      })
  }

  private getSaisons = (serie: object) => {
    this.media = new Serie(serie);
    this.saisons = new Array();
    for (let i = 0; i < this.media['totalSeasons']; i++) {
      this.saisons.push(i);
    }
  }

  public goBack = () => {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 600
    };
    this.nativePageTransitions.flip(options);
    this.navCtrl.pop();
  }

  public goToSaison = (id: string, num: number) => {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 600
    };
    this.nativePageTransitions.flip(options);
    this.navCtrl.push(SaisonPage, { id: id, num: num });
  }

  public addFavorite = () => {
    this.favorites.addMedia(this.media);
  }

  public checkFavorite = () => {
    return this.favorites.checkMediaExist(this.media);
  }

  public removeFavorite = () => {
    this.favorites.removeMedia(this.media);
  }

  public downloadPicture = () => {
    const url = this.media['poster'];
    let dir = 'Download';
    this.file.createDir(this.file.externalRootDirectory, dir, true)
      .then((data) => {
        this.fileTransfer.download(url, data.toURL() + this.media['title'] + '.png')
          .then((entry) => {
            const alert = this.alertCtrl.create({
              title: 'Réussie !',
              subTitle: "Téléchargement terminée !",
              buttons: ['OK']
            });
            alert.present();
          }, (err) => {
            console.log("downloadPicture", err);
            const alert = this.alertCtrl.create({
              title: 'Erreur !',
              subTitle: "Impossible de télécharger l'image !",
              buttons: ['OK']
            });
            alert.present();
          });
      });
  }

}
