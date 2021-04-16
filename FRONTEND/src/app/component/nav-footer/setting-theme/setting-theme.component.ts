import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../service/themeService.service';

@Component({
  selector: 'app-setting-theme',
  templateUrl: './setting-theme.component.html',
  styleUrls: ['./setting-theme.component.css']
})
export class SettingThemeComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(public themeService: ThemeService) {
  }


}
