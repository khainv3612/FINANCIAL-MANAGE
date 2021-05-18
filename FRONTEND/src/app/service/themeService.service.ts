import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  loading = false;


  private presentThemeSubject = new BehaviorSubject(
    localStorage.getItem('theme') || 'theme-light'
  );
  presentTheme$: Observable<string> = this.presentThemeSubject.asObservable();

  constructor() {
  }


// ...
  changeTheme(theme): void {
    this.presentThemeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  checkLoading(): boolean {
    return this.loading;
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }
}
