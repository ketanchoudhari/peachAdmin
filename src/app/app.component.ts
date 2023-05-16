import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './services/models/common.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { IApis } from './shared/types/apis';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peach_admin';
  isPremiumSite= environment.isPremiumSite;
  oldAdmin = environment.oldAdmin;
  userdata: any;
  
  // siteName = environment.siteName;

  constructor(
    private commonService: CommonService,
    private auth: AuthService,
    private router: Router,


    @Inject(DOCUMENT) private document: Document,
  )
  {
    
    // let favicon = this.document.querySelector('#appIcon') as HTMLLinkElement;
    // favicon.href = "/src/assets/images/favicon.ico" + ".ico";
    // this.document.body.classList.add(this.siteName);
    // this.loadStyle('assets/theme/' + this.siteName + '.css');


    this.commonService.getApis().subscribe((res:any) => {

      let devEnv =
        window.location.origin.includes("cricbuzzer") || window.location.origin.includes("localhost1");
      if (devEnv) {
        res.adminIp = res.ssladmin;
      } else {
        res.adminIp = res.adminIp;
        // if (location.protocol === 'https:') {
          res.adminIp = res.ssladmin;
        // }
      }
      // console.log(res);

      this.commonService.apis$.next(res);
    });
    
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
