import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  title: string;

  constructor(private router: ActivatedRoute) {
    if (this.router.snapshot.paramMap.get('title')) {
      this.title = this.router.snapshot.paramMap.get('title');
    }
  }

  ngOnInit(): void {
  }

}
