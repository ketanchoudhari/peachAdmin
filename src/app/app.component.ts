import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peach_admin';
  // siteName = environment.siteName;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  )
  {
    // let favicon = this.document.querySelector('#appIcon') as HTMLLinkElement;
    // favicon.href = "/src/assets/images/favicon.ico" + ".ico";
    // this.document.body.classList.add(this.siteName);
    // this.loadStyle('assets/theme/' + this.siteName + '.css');
  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
