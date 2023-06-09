import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataShareService } from '../services/data-share.service';

import { UsersService } from '../users/users.service';
import { CommonService } from '../services/models/common.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BankingService } from '../services/banking.service';
import { GenericResponse } from '../shared/types/generic-response';
import { IUserList } from '../users/models/user-list';
import { Subject, Subscription, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { CurrentUser } from '../services/types/current-user';
import { AuthService } from '../services/auth.service';
import { User } from '../users/models/user.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from '../users/user-list/sub/password-strength.validator';
import { ActivatedRoute, Route } from '@angular/router';
import { ShareUserService } from '../services/share-user.service';
import { ISharing } from '../shared/types/sharing';
import { UserSearchService } from '../services/user-search.service';
import * as html2pdf from 'html2pdf.js'
import { ETransactionType } from '../shared/types/transactions-type';
import { ExportService } from '../services/export-as.service';



@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit {
  currentUser?: CurrentUser;
  isInTransit: boolean;
  subSink = new Subscription();
  showTotalBox: boolean = false;
  totalBalance: number;
  userList: any = [];
  modalRef!: BsModalRef;
  userid: number; //logedin userid
  result: any;
  user: User;
  statusUser?: User;
  changeStatusOpen: boolean = false;
  @ViewChild('modalDeposit') modalDeposit!: ElementRef;
  @ViewChild('closebutton') closebutton;
  depositShow: boolean = false;
  withdrawShow: boolean = false;
  limitShow: boolean = false;
  creditShow: boolean = false;
  statusShow: boolean = false;
  passwordShow: boolean = false;
  // userActive:boolean=false;
  selectedStatus: 0 | 1 | 2;
  statusForm: FormGroup;
  changePassForm: FormGroup;
  changePassModalOpen: boolean = false;
  transferForm: FormGroup;
  private baseUrl: string;
  trntype: number;
  validRow: number = 0;
  debounceClick;
  searchTerm$ = new Subject<string>();
  searchTerm: string = "";
  submitted: boolean;
  amountInput: number = 0;
  creditRefForm: FormGroup;
  useridnew: string;
  changeShareForm: FormGroup;
  changeExposureLimitForm: FormGroup;
  selectedUid: number = 0;
  currentUserProfile?: User;
  isClient: boolean = true;
  isWhitelabel: boolean = false;
  sharingMap: ISharing;
  searchField: FormControl;
  userType?: number = 0;
  userRegForm: FormGroup;
  selectedUser?: User;
  confirmDeleteModalOpen: boolean = false;
  minMaxSharing: number = 0;
  deleteUserForm: FormGroup;
  userRegDefaultValues = {};
  userName:any;
  subUserName:any=[];
  formsDefaultVal = {};
  titletext: string;
  isChecked:any=this.userList.userStatus;
  subUserId: any;
  changeExposureLimitOpen: boolean = false;
  userLogs: any;
  transactionType = ETransactionType;
  depositUpline: number;
  depositDownline: number;
  withdrawUpline: number;
  withdrawDownline: number;
  totalDepositDownline : any = 0;
  totalDepositUpline : any = 0;
  totalWithdrawUpline : any = 0;
  totalWithdrawDownline : any = 0;
  userBalance:any;
  subUserAvbBalance:any;
  debitBalance:any;
  transactionNum:any;

  // userPassword: any;
  constructor(
    private modalService: BsModalService,
    private bankingService: BankingService,
    private userService: UsersService,
    private commonServices: CommonService,
    private httpClient: HttpClient,
    private auth: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private shareUserService: ShareUserService,
    private userSearch: UserSearchService,
    private exportService: ExportService,
  ) {
    this.useridnew = localStorage.getItem('user')
  }
  ngOnInit(): void {

    setTimeout(() => {
      this.formsDefaultVal = this.transferForm.value;
    });

    this.commonServices.apis$.subscribe((res) => {
      if (!environment.isProduction) {
        this.baseUrl = res.devAdminIp;
      } else {
        this.baseUrl = res.adminReport;
      }

      setTimeout(() => {
        this.userlist(this.userid);
      }, 1000);

    });

    this.changePassForm = this.formBuilder.group(
      {
        userId: [, Validators.required],
        newpassword: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ]),
        ],
        confirm: [null, Validators.required],
        password: [, Validators.required],
      },
      { validators: ActiveUsersComponent.confirm }
    );
    this.changeShareForm = this.formBuilder.group({
      userId: [, Validators.required],
      sharePercent: [],
      cricketSharing: [],
      cricketFancySharing: [],
      soccerSharing: [],
      soccerGoalsSharing: [],
      tennisSharing: [],
      indianCasinoSharing: [],
    });

    this.userid = this.auth.currentUser.userId;
    this.userName = this.auth.currentUser.userName;
    this.userBalance =this.auth.currentUser.balance;
    this.commonServices.listAllHierarchy();

    this.statusForm = this.formBuilder.group({
      password: [, Validators.required],

    });


    this.changeExposureLimitForm = this.formBuilder.group({
      userId: [, Validators.required],
      exposureLimit: [, Validators.required],
      password: [, Validators.required],
    });
    this.selectedUid = this.route.parent.snapshot.params['userid'];

    this.auth.currentUser$.subscribe((currentUser) => {
      if (!!currentUser) {
        this.currentUser = currentUser;
        this.changePassForm.get('subUserId').setValue(this.useridnew);
        this.changeExposureLimitForm.get('userId').setValue(this.useridnew);
        this.commonServices.apis$.subscribe((res) => {
          // this.listUser(false);
          this.userService
            .getUser(currentUser.userId)
            .subscribe((res: GenericResponse<User[]>) => {
              if (res.errorCode === 0) {
                this.currentUserProfile = res.result[0];
              }
            });

        });
      }
    });

    this.transferForm = this.formBuilder.group({
      password: [, Validators.required],
      userId: [this.useridnew, Validators.required],
      txnType: [1],
      amount: [, Validators.required],
      key: [],
      mainUserId: [this.currentUser.userId],
      remark: []

    });


    this.auth.currentUser$.subscribe((currentUser) => {
      if (!!currentUser) {
        this.currentUser = currentUser;
        this.changePassForm.get('userId').setValue(this.useridnew);
        this.changeExposureLimitForm.get('userId').setValue(this.useridnew);
        this.commonServices.apis$.subscribe((res) => {
          // this.listUser(false);
          this.userService
            .getUser(currentUser.userId)
            .subscribe((res: GenericResponse<User[]>) => {
              if (res.errorCode === 0) {
                this.currentUserProfile = res.result[0];
              }
            });

        });
      }
    });

    this.currentUser = this.auth.currentUser;
    this.selectedUid = 0;
    this.userType = 0;

  }
// to show amount in other span
userDipo(userName,userId,balance,num){
  this.subUserName=userName;
  this.subUserId=userId;
  this.subUserAvbBalance=balance;
  this.transactionNum=num;
}

  onInputChange(event: any) {
    if(this.transactionNum==1){
    let balance = parseFloat(this.subUserAvbBalance) + parseFloat(event.target.value);
    this.amountInput =balance;
    let debbalance =parseFloat(event.target.value)-parseFloat(this.userBalance);
    this.debitBalance=debbalance;
    }
    else if(this.transactionNum==2){
      let balance = parseFloat(this.subUserAvbBalance) - parseFloat(event.target.value);
      this.amountInput =balance;
      let debbalance =parseFloat(event.target.value)+parseFloat(this.userBalance);
      this.debitBalance=debbalance;
    }
  }
  public onSave() {
    this.closebutton.nativeElement.click();
  }
  getuserid(u) {
    this.subUserId = u;
    localStorage.setItem('user', this.subUserId.toString());
    // console.log("", this.subUserId)

  }
 


  userlist(userid: number) {

    this.userService.listsUsers(userid).subscribe((res: any) => {
      console.log("real list user", res.result[0])
      this.userList = res.result[0].users;
      this.subUserName=this.userList.userName;
      console.log(this.userList,"subusername")
      this.userList.forEach((element) => {
        element.totalBalance = parseFloat(element.availableBalance + element.downlineBalance).toFixed(2);
      });
      this.userList.forEach((element) => {
        element.refPL = (element.creditRef - element.availableBalance - element.exposure - element.downlineBalance).toFixed(2);
        if (element.refPL !== 0) {
          element.refPL = (element.refPL * -1)
        }
      });
      console.log("new userlist", this.userList.length)

    })
  }
  openChangeStatusModal(user: User) {
    this.statusUser = user;
    this.changeStatusOpen = true;
  }
  selectStatus(event: Event, status: 0 | 1 | 2) {
    if (this.statusUser.userStatus !== status) {
      (<HTMLButtonElement>event.target).classList.add('open');
      this.selectedStatus = status;
      console.log(this.selectedStatus);

    }
  }
  senddeposite(){
    if (this.transferForm.invalid) {
      // this.toastr.error("Invalid Input");
      return;

    }


  }
  transfer() {
    console.log("transfer sub userid",this.subUserId)
    let data = {
      password: this.transferForm.value.password,

      users: ([{
        userId: this.subUserId,
        txnType: this.trntype,
        amount: this.transferForm.value.amount,
        key: 0,
        mainUserId: this.currentUser.userId,
        remark: this.transferForm.value.remark

      }]),

    }

    this.bankingService.transfer(data)
      .subscribe((res: GenericResponse<any>) => {
        if (res && res.errorCode === 0) {

          res.result.forEach((user) => {
            if (user.result === 'SUCCESS') {
              this.userlist(this.userid);

              // this.toastr.success('Transaction Successful');
              this.transferForm.reset();
              this.onSave();
            } else {
              // this.toastr.error(`User: ${user.userName}; ${user.result}`);
            }
          });
          this.commonServices.updateBalance();
          this.validRow = 0;
          this.searchTerm = "";
        } else {
          // this.toastr.error(res.errorDescription);
        }
        this.submitted = false;
      });


  }

  selectTxType(user: User, type, u) {
    setTimeout(() => {
      user.selectDW = type;
      this.userid = u;
      this.trntype=type;
      if(this.trntype==1){
        this.titletext="Deposite"
      }
      else{
        this.titletext="Withdrwal"
      }
      localStorage.setItem('user', this.userid.toString());
      console.log("", this.userid)
    });
  }
  getUser() {
    this.userService
      .getUser(this.user.userId)
      .subscribe((res: GenericResponse<User[]>) => {
        this.shareUserService.setUser(res.result[0]);
      });
  }
  get c() {
    return this.changePassForm.get('confirm');
  }

  static confirm(formGroup: FormGroup) {
    const newpassword = formGroup.get('newpassword');
    const confirm = formGroup.get('confirm');

    return confirm.dirty
      ? !!newpassword.value && newpassword.value !== confirm.value
        ? { isNotMatching: true }
        : null
      : null;
  }
  get f() {
    return this.changePassForm;
  }

  changePass() {
    console.log("change password")
    if (this.changePassForm.invalid) {
      return;
    }
    if (this.changePassForm) {
      const { confirm, ...result } = this.changePassForm.value;
      this.userService
        .changePassword(result)
        .subscribe((res: GenericResponse<any>) => {
          console.log(res);
          if (res?.errorCode === 0) {
            // this.toastr.success('Password changed successfully');
            this.changePassModalOpen = false;
            this.f.controls['newpassword'].reset();
            this.f.controls['password'].reset();
            this.f.controls['confirm'].reset();
            this.onSave();
            // this.router.navigateByUrl('/login');
            // $('#password').modal('hide');
          } else {
            // this.toastr.error(res.errorDescription);
          }
        });
    } else {
      if (this.f.errors && this.f.errors['isNotMatching']) {
        // this.toastr.error("Passwords don't match");
        return;
      }
      // this.toastr.error('Invalid Input');
    }
  }

  changeExposureLimit() {
    if (this.changeExposureLimitForm.invalid) {
      return;
    }
    if (this.changeExposureLimitForm) {
      this.userService
        .changePassword(this.changeExposureLimitForm.value)
        .subscribe((res: GenericResponse<any>) => {
          console.log(res);
          if (res.errorCode === 0) {
            // this.toastr.success('Exposure Limit Changed');
            this.changeExposureLimitOpen = false;
            this.changeExposureLimitForm.reset();
            this.onSave();
            this.getUser();
          } else {
            // this.toastr.error(res.errorDescription);
          }
        });
    } else {
      // this.toastr.error('Invalid Input');
    }
  }




  changeStatus() {
    console.log("changeStatus function ", this.selectedStatus)
    if (this.statusForm.valid && this.selectedStatus !== null) {
      let changeStatus = this.statusForm.value;
      console.log("changeStatus", this.statusForm.value)
      changeStatus.userStatus = this.selectedStatus;
      this.userService
        .updateStatus(this.statusUser.userId, changeStatus)
        .subscribe((res: GenericResponse<any>) => {
          console.log("update status resp ", res);
          if (res && res.errorCode === 0) {
            this.changeStatusOpen = false;
            // this.toastr.success('Changed status successfully');
            this.onSave();
            this.userlist(this.statusUser.userId);
            this.selectedStatus = null;
            this.statusForm.reset();
          } else {
            // this.toastr.error(res.errorDescription);
          }
        });
    } else {
      //  console.log(this.statusForm);

      // this.toastr.error('Invalid Input');
    }
  }




  toggelDeposit() {
    this.depositShow = !this.depositShow;
  }


  //  openModal() {
  //   const modal = this.modalDeposit.nativeElement;
  //   (modal).modal('show');
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  isCheckboxChecked(userStatus): boolean {

    if (userStatus==1) {
      return true;
  }
  return false;

  }

  exportPdf() {
    var element = document.getElementById('example');
    console.log(this.exportPdf,"exe")
    var opt = {
      margin: 1,
      filename: 'Activity Statement_'+new Date().toDateString(),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(element).set(opt).save();
  }

  udt;
  edata = [];
  exportExcel() {
    this.udt = {
      data: [
        { A: 'Account Statement' }, // title
        {
          A: 'Date/Time',
          B: 'Deposite By Upline',
          C: 'Deposite By Downline',
          D: 'Withdraw By Upline',
          E: 'Withdraw By Downline',
          F: 'Balance',
          G: 'Remark',
          H: 'From/TO'
        }, // table header
      ],
      skipHeader: true,
    };
    this.userLogs.forEach((x) => {
      if (x.type == this.transactionType.DEPOSIT_UPLINE) {
        this.depositUpline = x.amount;
      }
      else {
        this.depositUpline = 0;
      }
      if (x.type == this.transactionType.DEPOSIT_DOWNLINE) {
        this.depositDownline = x.amount;
      }
      else {
        this.depositDownline = 0;
      }
      if (x.type == this.transactionType.WITHDRAW_UPLINE) {
        this.withdrawUpline = x.amount;
      }
      else {
        this.withdrawUpline = 0;
      }
      if (x.type == this.transactionType.WITHDRAW_DOWNLINE) {
        this.withdrawDownline = x.amount;
      }
      else {
        this.withdrawDownline = 0;
      }
      this.udt.data.push({
        A: x.dateTime,
        B: this.depositUpline,
        C: this.depositDownline,
        D: this.withdrawUpline,
        E: this.withdrawDownline,
        F: x.balance,
        G: x.description,
        H: 'From ' + x.from + ' To ' + x.to
      });
    });
    this.udt.data.push({
      A: 'Total',
      B: this.totalDepositUpline,
      C: this.totalDepositDownline,
      D: this.totalWithdrawUpline,
      E: this.totalWithdrawDownline
    });
    this.edata.push(this.udt);
    this.exportService.exportJsonToExcel(this.edata.slice(-1), 'Activity Statement_'+new Date().toDateString());
  }

  resetForm(): void {
    this.transferForm.reset();
    this.debitBalance=null;
    this.amountInput=null;
  }
}
