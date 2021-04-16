import {Component} from '@angular/core';
import {ThemeService} from './service/themeService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';

  constructor(public themeService: ThemeService) {
  }
}
