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
import { Subscription, finalize } from 'rxjs';
import { CurrentUser } from '../services/types/current-user';
import { AuthService } from '../services/auth.service';
import { User } from '../users/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from '../users/user-list/sub/password-strength.validator';



@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit {
  currentUser: CurrentUser;
  isInTransit: boolean;
  subSink = new Subscription();
  showTotalBox: boolean = false;
  totalBalance:number;
  userList:any=[];
  modalRef!: BsModalRef;
  userid: number;
  result: any;
  user:User;
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
  private baseUrl: string;
  constructor(
    private modalService: BsModalService,
    private bankingService: BankingService,
    private userService: UsersService,
    private commonServices: CommonService,
    private httpClient: HttpClient,
    private auth:AuthService,
    private formBuilder: FormBuilder,
  ) {
   
  }
  ngOnInit(): void {

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

    this.userid = this.auth.currentUser.userId;
    this.commonServices.listAllHierarchy();

    this.statusForm = this.formBuilder.group({
      password: [, Validators.required],

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

     }
    

  userlist(userid: number){

    this.userService.listsUsers(userid).subscribe((res:any)=>{
      console.log("real list user",res.result[0])
      this.userList = res.result[0].users;
      this.userList.forEach((element) => {
        element.totalBalance= parseFloat(element.availableBalance + element.downlineBalance).toFixed(2);
      });
      this.userList.forEach((element) => {
        element.refPL= (element.creditRef - element.availableBalance-element.exposure-element.downlineBalance).toFixed(2);
        if(element.refPL !== 0){
          element.refPL = (element.refPL * -1)
        }
      });
      console.log("new userlist",this.userList.length)

    })
  }
  public onSave() {
    this.closebutton.nativeElement.click();
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
  changeStatus() {
    console.log("changeStatus function ",this.selectedStatus)
    if (this.statusForm.valid && this.selectedStatus !== null) {
      let changeStatus = this.statusForm.value;
      console.log("changeStatus",this.statusForm.value)
      changeStatus.userStatus = this.selectedStatus;
      this.userService
        .updateStatus(this.statusUser.userId, changeStatus)
        .subscribe((res: GenericResponse<any>) => {
         console.log("update status resp ",res);
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
  
  changePass() {
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
            console.log("some error")
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

  toggelDeposit() {
    this.depositShow = !this.depositShow;
  }

  //  openModal() {
  //   const modal = this.modalDeposit.nativeElement;
  //   (modal).modal('show');
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
