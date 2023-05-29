import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { User } from 'src/app/users/models/user.model';
import { IRace } from './types/race';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/models/common.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { UsersService } from 'src/app/users/users.service';
import { RacesService } from './races.service';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { IUserList } from 'src/app/users/models/user-list';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit{
  selectedTabIndex: number = 0;
  selectedUser: string = '';
  currentUser: CurrentUser;
  usersList: User[];
  races: IRace[] = [];
  racesHolder: IRace[] = [];
  selectAll = false;

  racesSelectMap = {};

  whitelabelUserType: number;
  vrnlUserType: number;
  selectedSport: number = 0;
  Update: any;

  constructor(
    private racesService: RacesService,
    private usersService: UsersService,
    private auth: AuthService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    public commonService: CommonService,
    private shareService: ShareDataService
  ){

  }
  ngOnInit(): void {
    this.commonService.apis$.subscribe((res) => {
      this.getRaces();
      this.listUser();
    });
    this.currentUser = this.auth.currentUser;

    this.commonService.hierarchyMap$.subscribe((map) => {
      this.whitelabelUserType = this.commonService.whitelabelUserType;
      this.vrnlUserType = this.commonService.vrnlUserType;
    });
  }


  
  getRaces() {
    this.races = [];
    this.loadingService.setLoading(true);
    this.racesService.listRaces().subscribe((res: GenericResponse<IRace[]>) => {
      // if (res && res.errorCode === 0) {
      if (this.vrnlUserType === this.currentUser.userType) {
        res.result.forEach((t) => (this.racesSelectMap[t.eventTypeId] = false));
        this.races = res.result;
      } else {
        res.result.forEach((race) => {
          race?.countries?.forEach((country) => {
            let { countries, ...select } = race;
            let race1 = {
              ...select,
              country,
            };
            this.racesSelectMap[
              `${race1.eventTypeId}-${race1.country.countryCode}`
            ] = false;
            this.racesHolder.push(race1);
            this.races = Object.assign([], this.racesHolder);
          });
        });
      }
      //  console.log(this.racesSelectMap);

      this.loadingService.setLoading(false);
      // }
    });
  }
  selectTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }
  filterSport(e?) {
    this.selectAll = false;
    if (e) {
      this.selectedSport = +e.target.value;
    }
    if (this.selectedSport && this.racesHolder) {
      this.races = this.racesHolder.filter(
        (e) => +e.eventTypeId === +this.selectedSport
      );
    } else {
      this.races = this.racesHolder;
    }

    this.toggleSelectAll(false);
    if (this.currentUser.userType === this.whitelabelUserType) {
      this.racesSelectMap = {};
      this.races.forEach((race) => {
        this.racesSelectMap[`${race.eventTypeId}-${race.country.countryCode}`] =
          false;
      });
    }
  }
  
  toggleSelectAll(checked) {
    if (!checked) {
      Object.keys(this.racesSelectMap+checked).forEach(
        (k) => (this.racesSelectMap[k] = false)
      );
    } else {
      Object.keys(this.racesSelectMap).forEach(
        (k) => (this.racesSelectMap[k] = true)
      );
    }
    // if (Object.values(this.racesSelectMap).every((v) => v)) {
    //   Object.keys(this.racesSelectMap).forEach(
    //     (k) => (this.racesSelectMap[k] = false)
    //   );
    // } else {
    //   Object.keys(this.racesSelectMap).forEach(
    //     (k) => (this.racesSelectMap[k] = true)
    //   );
    // }
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
  onActiveCasino() {
    if (
      this.currentUser.userType === this.commonService.vrnlUserType &&
      this.selectedUser &&
      Object.values(this.racesSelectMap).filter((v) => v).length
    ) {
      const params = {
        userId: this.selectedUser,
        races: Object.keys(this.racesSelectMap)
          .filter((k) => this.racesSelectMap[k])
          .reduce((a, c) => {
            return [...a, c];
          }, []),
      };

      //  console.log(
      //   params,
      //   Object.values(this.racesSelectMap).filter((v) => v).length
      // );

      this.racesService
        .activateRace(params)
        .subscribe((res: GenericResponse<any>) => {
          if (res.errorCode === 0) {
            this.toastr.success('Races Updated');
            this.loadingService.setLoading(false);
          } else {
            this.toastr.error(res.errorDescription);
          }
        });
    } else if (
      this.currentUser.userType === this.commonService.whitelabelUserType &&
      Object.values(this.racesSelectMap).filter((v) => v).length
    ) {
      const params = {
        races: Object.keys(this.racesSelectMap)
          .filter((k) => this.racesSelectMap[k])
          .reduce((a, c) => {
            return [...a, c];
          }, []),
      };

      //  console.log(params, params.races.length);

      this.racesService
        .activateRace(params)
        .subscribe((res: GenericResponse<any>) => {
          if (res.errorCode === 0) {
            this.toastr.success('Races Updated');
            this.loadingService.setLoading(false);
          } else {
            this.toastr.error(res.errorDescription);
          }
        });
    } else {
      if (this.currentUser.userType === this.commonService.vrnlUserType) {
        this.toastr.error('Please select user and at least one race');
      } else {
        this.toastr.error('Please select atleast one race');
      }
    }
  }
}
