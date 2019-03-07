import { Component } from '@angular/core';
import { PAGES } from '../../helpers/pages';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  pages:any = PAGES;

  constructor() {

  }

}
