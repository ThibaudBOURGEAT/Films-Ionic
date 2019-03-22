import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { DescribePage } from '../pages/describe/describe';
import { MediaPage } from '../pages/media/media';
import { EpisodePage } from '../pages/episode/episode';
import { SaisonPage } from '../pages/saison/saison';
import { FavoritesPage } from '../pages/favorites/favorites';

import { TabsComponent } from '../components/tabs/tabs';
import { OMDbApiProvider } from '../providers/OMDb-api/OMDb-api';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    DescribePage,
    MediaPage,
    TabsComponent,
    EpisodePage,
    SaisonPage,
    FavoritesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DescribePage,
    MediaPage,
    EpisodePage,
    SaisonPage,
    TabsComponent,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OMDbApiProvider,
    HttpClient,
    FavoritesProvider,
    FileTransfer,
    File,
    AndroidPermissions,
    FileChooser,
    FilePath
  ]
})
export class AppModule {}
