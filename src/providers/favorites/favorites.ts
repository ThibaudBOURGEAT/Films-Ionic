import { HttpClient } from '@angular/common/http';
import { Injectable, Testability } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Media } from '../../models/media';
import { Episode } from '../../models/episode';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Injectable()
export class FavoritesProvider {

  private medias: Media[];
  private episodes: Episode[];

  constructor(public http: HttpClient,
    private storage: Storage,
    private file: File,
    private transfer: FileTransfer,
    private permissions: AndroidPermissions,
    private alertCtrl: AlertController) {
    this.medias = new Array();
    this.episodes = new Array();
    this.storage.get('medias')
      .then((medias) => {
        if (medias != null) {
          this.medias = medias;
        }
      });
    this.storage.get('episodes')
      .then((episodes) => {
        if (episodes != null) {
          this.episodes = episodes;
        }
      });
  }

  private AskPermission = (permission: string) => {
    return new Promise((resolve) => {
      this.permissions.checkPermission(permission).then(
        result => {
          if (!result.hasPermission) {
            resolve(this.permissions.requestPermission(permission));
          }else{
            resolve();
          }
        });
    });
  }

  public exportFavorites = (format: string) => {
    this.AskPermission(this.permissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      .then(() => {
        let file = new File();
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.download('data:text/json;charset=utf8,' + encodeURIComponent(
          JSON.stringify({medias:this.medias, episodes:this.episodes})
          ),
          file.externalRootDirectory + "Download/favorites." + format)
          .then(() => {
            const alert = this.alertCtrl.create({
              title: 'Réussie !',
              subTitle: "Fichier exporté !",
              buttons: ['OK']
            });
            alert.present();
          });
      });
  }

  public getAllMedias = () => {
    return new Promise((resolve) => {
      this.storage.get('medias')
        .then((medias) => {
          resolve(medias);
        });
    });
  }

  public getAllEpisodes = () => {
    return new Promise((resolve) => {
      this.storage.get('episodes')
        .then((episodes) => {
          resolve(episodes);
        });
    });
  }

  public checkMediaExist = (media: object) => {
    let exist: boolean = false;
    this.medias.forEach((value) => {
      if (value['id'] == media['id']) {
        exist = true;
      }
    });
    return exist;
  }

  public checkEpisodeExist = (episode: object) => {
    let exist: boolean = false;
    this.episodes.forEach((value) => {
      if (value['id'] == episode['id']) {
        exist = true;
      }
    });
    return exist;
  }

  public addMedia = (media: Media) => {
    if (!this.checkMediaExist(media)) {
      this.medias.push(media);
      this.storage.set('medias', this.medias);
    }
  }

  public addEpisode = (episode: Episode) => {
    if (!this.checkEpisodeExist(episode)) {
      this.episodes.push(episode);
      this.storage.set('episodes', this.episodes);
    }
  }

  public removeMedia = (media: Media) => {
    this.medias.forEach((value, index) => {
      if (value['id'] == media['id']) {
        this.medias.splice(index, 1);
      }
    });
    this.storage.set('medias', this.medias);
  }

  public removeEpisode = (episode: Episode) => {
    this.episodes.forEach((value, index) => {
      if (value['id'] == episode['id']) {
        this.episodes.splice(index, 1);
      }
    });
    this.storage.set('episodes', this.episodes);
  }
}
