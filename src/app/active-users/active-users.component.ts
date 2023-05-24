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
  userList:any;
  modalRef!: BsModalRef;
  userid: number;
  result: any;
  @ViewChild('modalDeposit') modalDeposit!: ElementRef;
  depositShow: boolean = false;
  withdrawShow: boolean = false;
  limitShow: boolean = false;
  creditShow: boolean = false;
  statusShow: boolean = false;
  passwordShow: boolean = false;
  private baseUrl: string;
  constructor(
    private modalService: BsModalService,
    private bankingService: BankingService,
    private userService: UsersService,
    private commonServices: CommonService,
    private httpClient: HttpClient,
    private auth:AuthService
  ) {
   
  }
  ngOnInit(): void {
    this.commonServices.apis$.subscribe((res) => {
      if (!environment.isProduction) {
        this.baseUrl = res.devAdminIp;
      } else {
        this.baseUrl = res.adminReport;
      }
      this.userlist(this.userid);
    });

    this.userid = this.auth.currentUser.userId;
    // this.getUsrList(this.userid)

    // console.log("userid",this.userid)
    // this.commonServices.apis$.subscribe((res) => {
    //  this.gethighrachy();
    // })
    this.commonServices.listAllHierarchy();
    // this.commonServices.loadfullHierarchy(this.userid).subscribe((res:any)=>{
    //   console.log("active user list of hierarchy",this.res)
    // })
  }

  //  gethighrachy(){
  //   this.userService.fullHierarchy().subscribe((res: any) => {
  //     console.log("all blow levels", res)
  //   })
  //  }
  // getUsrList(userid){

  //   this.userService.listUser(userid).subscribe((res:any)=>{
  //     console.log("below levels",res)
  //   })
  // // }
  // listUser() {
  //   if (!this.isInTransit) {
  //     this.isInTransit = true;
  //   }
  //   let listUsersSub = this.bankingService
  //     .listUsers()
  //     .pipe(finalize(() => (this.isInTransit = false)))
  //     .subscribe((res: GenericResponse<IUserList[]>) => {
  //       this.showTotalBox = true;
  //       if (res.errorCode === 0) {

  //         res.result[0].users = res.result[0].users.reverse();

  //         this.usersData = res.result[0];
  //         this.userList = this.usersData.users
  //         console.log("userdata",this.userList)
  //       }
  //     });
  // }
  userlist(userid){

    this.userService.listsUsers(userid).subscribe((res:any)=>{
      console.log("real list user",res.result[0])
      this.userList = res.result[0].users;
      // this.userList = this.usersData.users
      console.log("new userlist",this.userList)
    })
  }
  // listUsers() {
  //   return this.httpClient.get(`${this.baseUrl}/banking`);
  // }
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
