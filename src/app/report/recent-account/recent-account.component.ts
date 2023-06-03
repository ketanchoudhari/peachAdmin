import { Component, OnInit } from '@angular/core';
import { INewAccount } from '../types/new-accounts';
import { ExportService } from 'src/app/services/export-as.service';
import { ExportAsConfig } from 'ngx-export-as';
import { ReportsService } from '../reports.service';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { CommonService } from 'src/app/services/models/common.service';

@Component({
  selector: 'app-recent-account',
  templateUrl: './recent-account.component.html',
  styleUrls: ['./recent-account.component.css']
})
export class RecentAccountComponent implements OnInit {
  exportPdfConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'table_DL',
  };
  exportXlsConfig: ExportAsConfig = {
    type: 'xls',
    elementIdOrContent: 'table_DL',
  };
 
  selecttodate: Date;
  accountsList: INewAccount[];

  p: number = 1;
  selectfromtime: Date;
  selecttotime: Date;
  constructor(
    private reportsService:ReportsService,
    private exportService: ExportService,
    private commonService:CommonService,
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
 
  tableLength:boolean=true;
  docButton:boolean=false;
  fromDate;
  toDate;
  fromTime;
  toTime;
  selectfromdate;
  // myItems = [
  //   {id: 1, label: 'Option 1'},
  //   {id: 2, label: 'Option 2'},
  //   {id: 3, label: 'Option 3'},
  //   {id: 4, label: 'Option 4'},
  //   {id: 5, label: 'Option 5'}
  // ];
  
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
        //  console.log(this.accountsList, 'accountList');
        }
      });
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
