import { Component } from '@angular/core';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'mc';
  apiToken = '';
  apiTokenChanged(token: string) {
    this.apiToken = token;
  }
}
