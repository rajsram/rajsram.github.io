import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TractorApp';
  year = (new Date()).getFullYear();
  menuList: string[] = ['Entry', 'Expense', 'Income', 'Accounts', 'Settings'];
  page = this.menuList[0];
  version = '1.5';
  constructor(update: SwUpdate) {
    update.available.subscribe(e => {
      update.activateUpdate().then(() => { document.location.reload(); });
    });
  }
}
