import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PAGES } from '../helpers/pages';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages:any = PAGES;
  rootPage:any = HomePage;
  displaySearchbar:boolean = false;

  constructor(menuCtrl: MenuController, platform: Platform,
    statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public emitDisplaySearchbar = () => {
    if(this.displaySearchbar){
      this.displaySearchbar = false;
    }else{
      this.displaySearchbar = true;
    }
    this.events.publish('displaySearchbar', this.displaySearchbar);
  }

  public goTo = (page:any) => {
    this.nav.goToRoot(page);
  }

}
