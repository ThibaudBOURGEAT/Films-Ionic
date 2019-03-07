import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FilmsPage } from '../pages/films/films';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = FilmsPage;

  constructor(menuCtrl: MenuController, platform: Platform,
    statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


}
