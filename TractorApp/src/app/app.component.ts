import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TractorApp';
  year = (new Date()).getFullYear();
  menuList: string[] = ['Entry', 'List'];
  home = 'Entry';
}
