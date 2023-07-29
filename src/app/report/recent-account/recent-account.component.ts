import { Component, OnInit } from '@angular/core';
import { INewAccount } from '../types/new-accounts';
import { ExportService } from 'src/app/services/export-as.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { ReportsService } from '../reports.service';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { CommonService } from 'src/app/services/models/common.service';
// import { IDayTimeCalendarConfig } from 'ng2-date-picker';
// import { ITimeSelectConfig } from 'ng2-date-picker/lib/time-select/time-select-config.model';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { IDayTimeCalendarConfig } from 'ng2-date-picker/day-time-calendar/day-time-calendar-config.model';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';

@Component({
  selector: 'app-recent-account',
  templateUrl: './recent-account.component.html',
  styleUrls: ['./recent-account.component.css']
})
export class RecentAccountComponent implements OnInit {
  fromDate;
  fromTime;
  toDate;
  toTime;

  p: number = 1;

  dateConfig: IDayTimeCalendarConfig;
  timeConfig: ITimeSelectConfig;
  accountsList: INewAccount[];

  exportPdfConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'table_DL',
  };
  exportXlsConfig: ExportAsConfig = {
    type: 'xls',
    elementIdOrContent: 'table_DL',
  };

  siteName = environment.siteName;
  month;
  constructor(
    private reportsService: ReportsService,
    private datePipe: DatePipe,
    private exportAsService: ExportAsService,
    private exportService: ExportService,
    private commonService: CommonService
  ) {
    this.month =   datePipe.transform(new Date().setDate(new Date().getDate() - 90), 'yyyy-MM-dd');
    this.dateConfig = {
      format: 'YYYY-MM-DD',
      min: this.month,
    };

    this.fromDate = datePipe.transform(
      new Date().setDate(new Date().getDate() - 1),
      'yyyy-MM-dd'
    );
      this.fromTime = datePipe.transform(
        new Date().setHours(0, 0, 0),
        'HH:mm:ss'
      );


    this.toDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.toTime = datePipe.transform(new Date(), 'HH:mm:ss');

    this.timeConfig = {
      hours24Format: 'hh',
      showSeconds: true,
    };
  }

  ngOnInit(): void {
    this.commonService.apis$.subscribe(res => {
      this.getAccountList();
    })
  }

  getAccountList() {
    this.reportsService
      .newAccounts(
        `${this.fromDate} ${this.fromTime}`,
        `${this.toDate} ${this.toTime}`
      )
      .subscribe((res: GenericResponse<INewAccount[]>) => {
      //  console.log(res);
        if (res.errorCode === 0) {
          this.accountsList = res.result;
         console.log(this.accountsList, 'accountList');
        }
      });
  }

  getReportDate(value) {
    if (value === 'today') {
      this.fromDate = this.datePipe.transform(
        new Date().setDate(new Date().getDate()),
        'yyyy-MM-dd'
      );
        this.fromTime = this.datePipe.transform(
          new Date().setHours(0, 0, 0),
          'HH:mm:ss'
        );


      this.toDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.toTime = this.datePipe.transform(
        new Date(),
        'HH:mm:ss'
      );
    }
  }

  udt;
  edata = [];
  exportExcel() {
    this.udt = {
      data: [
        { A: 'User Data' }, // title
        {
          A: 'Id',
          B: 'userType',
          C: 'userName',
          D: 'creationDate',
        }, // table header
      ],
      skipHeader: true,
    };
    this.accountsList.forEach((x) => {
      this.udt.data.push({
        A: x.userId,
        B: String(x.userType),
        D: String(x.userName),
        E: String(x.creationDate),
      });
    });
    this.edata.push(this.udt);
  //  console.log(this.edata, 'edata after changes');

    let name =
      'New Accounts' +
      String(this.fromDate).replace('-', '').replace('-', '') +
      ' - ' +
      String(this.toDate).replace('-', '').replace('-', '');
    this.exportService.exportJsonToExcel(this.edata.slice(-1), name);
  }
  exportCsv() {
    let col = ['userId', 'userType', 'userName', 'creationDate'];
    let name =
      'New Accounts' +
      String(this.fromDate).replace('-', '').replace('-', '') +
      ' - ' +
      String(this.toDate).replace('-', '').replace('-', '');

    this.exportService.exportToCsv(this.accountsList, name, col);
  }
}
