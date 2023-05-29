import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { User } from 'src/app/users/models/user.model';
import { SelectsportsService } from './selectsports.service';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { CommonService } from 'src/app/services/models/common.service';
import { ToastrService } from 'ngx-toastr';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { IUserList } from 'src/app/users/models/user-list';
import { Isport } from './types/sport';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
  currentUser: CurrentUser;
  usersList: User[] = [];
  sportLists:Isport[] = [];
  sportList:any= [];
  selectedTabIndex: number = 0;
  selectedUser: string = '';
  sportSelectMap = {};
  whitelabelUserType: number;
  Update: any;
  constructor(private selectsportsService: SelectsportsService,
    private usersService: UsersService,
    private auth: AuthService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private shareService: ShareDataService,
    public commonService: CommonService) { 
      this.currentUser = this.auth.currentUser;
      this.commonService.apis$.subscribe((res) => {
        if (
          this.currentUser.userType === this.commonService.vrnlUserType){
            this.getSportsList(undefined);
            console.log(this.currentUser.userType === this.commonService.vrnlUserType);
            
          }else{
            this.getSportsList(this.currentUser.userId);
          }
        this.listUser();
      });

    this.commonService.hierarchyMap$.subscribe((map) => {
      this.whitelabelUserType = this.commonService.whitelabelUserType;
    });
    }

  ngOnInit(): void {
    this.getlanguages();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data;
        console.log(this.Update);
}

    })
  }
  getSportsList(userId) {
    this.loadingService.setLoading(true);
    this.selectsportsService
      .listSports(userId)
      .subscribe((res: GenericResponse<[]>) => {
        if (res && res.errorCode === 1) {
          this.sportLists = res.result;
          this.sportList = this.sportLists[0];
          const arr = [];
          this.sportList.forEach(element => {
            arr.push({"sportName":element,"selectesport":false})
          });
          this.sportList = arr;
          this.sportList.forEach(
            (t) => (this.sportSelectMap[t.sportName] = false)
          );

          console.log(this.sportList);
          this.loadingService.setLoading(false);
        }
      });
  }

  listUser() {
    this.usersService
      .listUser(
        this.auth.currentUser.userId,undefined,'active',
      )
      .subscribe((res: GenericResponse<IUserList[]>) => {
        if (res.errorCode === 0) {
          this.usersList = res.result[0].users;
          this.loadingService.setLoading(false);
        }
      });
  }

  listAllUsers() {
    for (let i = this.currentUser.userType + 1; i < 7; i++) {
      this.usersService
        .listUser(this.auth.currentUser.userId, i)
        .subscribe((res: GenericResponse<IUserList[]>) => {
          if (res.errorCode === 0) {
            this.usersList = this.usersList.concat(res.result[0].users);
            this.loadingService.setLoading(false);
          }
        });
    }
  }

  selectTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }

  onActiveCasino() {
    if (
      this.currentUser.userType === this.commonService.vrnlUserType &&
      this.selectedUser ) {
      const params = {
        userId: this.selectedUser,
        sports: Object.keys(this.sportSelectMap)
          .filter((k) => this.sportSelectMap[k])
          .reduce((a, c) => {
            return [...a, c];
          }, []),
      };

      //  console.log(
      //   params,
      //   Object.values(this.teenpattiSelectMap).filter((v) => v).length
      // );

      this.selectsportsService
        .activateSports(params)
        .subscribe((res: GenericResponse<any>) => {
          if (res.errorCode === 0) {
            this.toastr.success('Sports Updated');
            this.loadingService.setLoading(false);
          } else {
            this.toastr.error(res.errorDescription);
          }
        });
    } else if (
      this.currentUser.userType === this.commonService.whitelabelUserType &&
      Object.values(this.sportSelectMap).filter((v) => v).length
    ) {
      const params = {
        sports: Object.keys(this.sportSelectMap)
          .filter((k) => this.sportSelectMap[k])
          .reduce((a, c) => {
            return [...a, c];
          }, []),
      };

      //  console.log(params, params.tables.length);

      this.selectsportsService
        .activateSports(params)
        .subscribe((res: GenericResponse<any>) => {
          if (res.errorCode === 0) {
            this.toastr.success('Sports Updated');
            this.loadingService.setLoading(false);
          } else {
            this.toastr.error(res.errorDescription);
          }
        });
    } else {
      if (this.currentUser.userType === this.commonService.vrnlUserType) {
        this.toastr.error('Please select user and at least one Sport');
      } else {
        
        this.toastr.error('Please select atleast one Sport');
      }
    }
  }

  toggleSelectAll(checked) {
    if (Object.values(this.sportSelectMap).every((v) => v)) {
      Object.keys(this.sportSelectMap).forEach(
        (k) => (this.sportSelectMap[k] = false)
      );
    } else {
      Object.keys(this.sportSelectMap).forEach(
        (k) => (this.sportSelectMap[k] = true)
      );
    }
  }


}
