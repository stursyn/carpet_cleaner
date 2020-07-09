import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage {

  constructor(private navigationService:NavigationService) {

  }

  tabsDidChange(event: any) {
    if(event.tab == 'order-list') {
      this.navigationService.doOrderListRefresh()
    }
    if(event.tab == 'order-map') {
      this.navigationService.doOrderMapRefresh();
    }
  }
}
