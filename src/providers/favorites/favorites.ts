import { HttpClient } from '@angular/common/http';
import { Injectable, Testability } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Media } from '../../models/media';
import { Episode } from '../../models/episode';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as convert from 'json-2-csv';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

@Injectable()
export class FavoritesProvider {

  private medias: Media[];
  private episodes: Episode[];

  constructor(public http: HttpClient,
    private storage: Storage,
    private transfer: FileTransfer,
    private permissions: AndroidPermissions,
    private fileChooser: FileChooser,
    private filePath: FilePath) {
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

  private askPermissionAndroid = (permission: string) => {
    return new Promise((resolve) => {
      this.permissions.checkPermission(permission).then(
        result => {
          if (!result.hasPermission) {
            resolve(this.permissions.requestPermission(permission));
          } else {
            resolve();
          }
        });
    });
  }

  public importFavorites = () => {
    return new Promise((resolve, reject) => {
      this.askPermissionAndroid(this.permissions.PERMISSION.READ_EXTERNAL_STORAGE)
        .then(() => {
          this.fileChooser.open()
            .then((uri) => {
              let file = new File();
              if (uri.endsWith(".json")) {
                console.log("json", uri);
                this.filePath.resolveNativePath(uri)
                  .then((path) => {
                    let pathSplit = path.split("/");
                    let filename = pathSplit.pop();
                    path = pathSplit.join("/");
                    file.readAsText(path, filename)
                      .then((json) => {
                        let obj: object = JSON.parse(json);
                        this.medias = obj['medias'];
                        this.episodes = obj['episodes'];
                        this.storage.set('medias', this.medias);
                        this.storage.set('episodes', this.episodes);
                        resolve();
                      })
                  });
              } else if (uri.endsWith(".csv")) {
                this.filePath.resolveNativePath(uri)
                  .then((path) => {
                    let pathSplit = path.split("/");
                    let filename = pathSplit.pop();
                    path = pathSplit.join("/");
                    file.readAsText(path, filename)
                      .then((csv) => {
                        convert.csv2json(csv, (err,file)=>{
                          if (err) reject(err);              
                          let value : any = file[0];
                          this.medias = value['medias'];
                          this.episodes = value['episodes'];
                          this.storage.set('medias', this.medias);
                          this.storage.set('episodes', this.episodes);
                          resolve();
                        },{})
                      });
                  });
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }

  public exportFavorites = (format: string) => {
    return new Promise((resolve, reject) => {
      this.askPermissionAndroid(this.permissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        .then(() => {
          let file: any;
          if (format == "csv") {
            file = { medias:this.medias, episodes:this.episodes };
            convert.json2csv(file, (err, file) => {
              if(err) reject(err);
              this.exportFile(format, file).then(() =>{ resolve()});
            }, {});
          } else {
            file = JSON.stringify({ medias: this.medias, episodes: this.episodes });
            this.exportFile(format, file).then(() =>{ resolve()});
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private exportFile = (format: string, fileToExport: string)=>{
    return new Promise((resolve) => {
      let file = new File();
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.download('data:text/' + format + ';charset=utf8,' + encodeURIComponent(fileToExport),
        file.externalRootDirectory + "Download/favorites." + format)
        .then(() => {
          resolve();
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
