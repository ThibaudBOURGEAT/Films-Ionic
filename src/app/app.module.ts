import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DescribePage } from '../pages/describe/describe';
import { OMDbApiProvider } from '../providers/OMDb-api/OMDb-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DescribePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DescribePage
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
