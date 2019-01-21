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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public emitDisplaySearchbar = () => {
    if(this.displaySearchbar){
      console.log("2");
      this.displaySearchbar = false;
    }else{
      console.log("3");
      this.displaySearchbar = true;
    }
    console.log("4",this.displaySearchbar);
    this.events.publish('displaySearchbar', this.displaySearchbar);
  }

  public goTo = (page:any) => {
    this.nav.goToRoot(page);
  }

}
