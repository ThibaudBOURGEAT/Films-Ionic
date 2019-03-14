import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { MyApp } from './app.component';
import { DescribePage } from '../pages/describe/describe';
import { MediaPage } from '../pages/media/media';
import { EpisodePage } from '../pages/episode/episode';
import { SaisonPage } from '../pages/saison/saison';

import { TabsComponent } from '../components/tabs/tabs';
import { OMDbApiProvider } from '../providers/OMDb-api/OMDb-api';

@NgModule({
  declarations: [
    MyApp,
    DescribePage,
    MediaPage,
    TabsComponent,
    EpisodePage,
    SaisonPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DescribePage,
    MediaPage,
    EpisodePage,
    SaisonPage,
    TabsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OMDbApiProvider,
    HttpClient,
    NativePageTransitions
  ]
})
export class AppModule {}
