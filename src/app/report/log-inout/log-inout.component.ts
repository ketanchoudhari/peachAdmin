import { Component } from '@angular/core';
import { ILogin } from '../types/login';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { ReportsService } from '../reports.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/models/common.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log-inout',
  templateUrl: './log-inout.component.html',
  styleUrls: ['./log-inout.component.css']
})
export class LogInoutComponent {
  loginList: ILogin[];
  logoutList: ILogin[];
  failedLoginList: ILogin[];
  p: number = 1;
  n: number = 10;
  selectedTabIndex: number = 0;

  selecttodate: Date;
  selectfromtime: Date;
  selecttotime: Date;
  currnetUser: CurrentUser;
  Update: any;
  time = { hour: 13, minute: 30 };   //for time selection
	meridian = true;                //for time selection
  
  loginStatusMap = {
    1: 'Login Successful',
    0: 'Login Failed',
    2: 'Logout',
  };
  constructor(
    private reportsService: ReportsService,
    private loadingService: LoadingService,
    private authservice: AuthService,
    private commonService: CommonService,
    private shareService: ShareDataService
  ){
    this.selectfromdate = new Date(
      new Date(new Date().setDate(new Date().getDate() - 30)).setHours(9, 0, 0)
    );
    this.selecttodate = new Date(
      new Date(new Date().setDate(new Date().getDate())).setHours(8, 59, 59)
    );
    this.selectfromtime = new Date(new Date().setHours(0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0));
  }
  timeFormat = environment.timeFormat;

  ngOnInit(): void {
    this.currnetUser = this.authservice.currentUser;
  //  console.log(this.currnetUser);
    this.commonService.apis$.subscribe((res) => {
      this.getLogintReport();
    });
  }

  tableLength:boolean=true;
  docButton:boolean=false;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  selectfromdate: Date | undefined;
  myItems = [
    {id: 1, label: 'Option 1'},
    {id: 2, label: 'Option 2'},
    {id: 3, label: 'Option 3'},
    {id: 4, label: 'Option 4'},
    {id: 5, label: 'Option 5'}
  ];
  
  fromDateOptions = {
    dateFormat: 'mm/dd/yyyy',
    minYear: 1900,
    maxYear: 2099,
    firstDayOfWeek: 'su'
  };
  toDateOptions = {
    dateFormat: 'mm/dd/yyyy',
    minYear: 1900,
    maxYear: 2099,
    firstDayOfWeek: 'su'
  };
  
  toggleMeridian() {
		this.meridian = !this.meridian;
	}
  selectNoRows(numberOfRows: any) {
    this.p = 1;
    this.n = +numberOfRows.value;
  }
  getLogintReport() {
    this.loadingService.setLoading(true);
    this.reportsService
      .loginLogout()
      .subscribe((res: GenericResponse<ILogin[]>) => {
        this.loginList = [];
        this.logoutList = [];
        this.failedLoginList = [];
        if (res.errorCode === 0) {
          res.result = res.result.sort((a, b) => {
            return Date.parse(b.loginTime) - Date.parse(a.loginTime);
          });

          // res.result = res.result.map(res => res.loginTime=(new Date(res.loginTime).toLocaleString("en-US", {timeZone: "Asia/Kolkata"})));

          //   //  console.log(new Date('2021-06-18T18:01:00Z').toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));  convert to indian time statndard
          // VM2801:1 6/18/2021, 11:31:00 PM

          res.result.forEach((login) => {
            // login.loginTime= (new Date(login.loginTime).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));

            switch (login.loginStatus) {
              case 0:
                this.failedLoginList.push(login);
                break;
              case 1:
                this.loginList.push(login);
                break;
              case 2:
                this.logoutList.push(login);
                break;
            }
          });
        }

        this.loadingService.setLoading(false);
      });
  }
  selectTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
    this.p = 0;
  }
  
}
