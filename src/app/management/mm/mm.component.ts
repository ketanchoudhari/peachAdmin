import { Component } from '@angular/core';

@Component({
  selector: 'app-mm',
  templateUrl: './mm.component.html',
  styleUrls: ['./mm.component.css']
})
export class MmComponent {
  selecttodate: Date;
  selectfromtime: Date;
  selecttotime: Date;
  time = { hour: 13, minute: 30 };   //for time selection
	meridian = true;                //for time selection
  constructor(){
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
  fromDate: Date | undefined;
  toDate: Date | undefined;
  selectfromdate: Date | undefined;
  myItems = [
    {id: 1, label: 'All'},
    {id: 2, label: 'Soccer'},
    {id: 3, label: 'Tennis'},
    {id: 4, label: 'Cricket'},
    {id: 5, label: 'Kabaddi'}
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



  onRefresh() {

    setTimeout(() => {
    //   if (this.selectedTabIndex == 1) {
    //     setTimeout(() => {
    //       this.getActivateGame();
    //     }, 1000);

    //   } else if (this.selectedTabIndex == 2) {
    //     setTimeout(() => {
    //       this.getActivateGame();
    //     }, 1000);
    //   } else if (this.selectedTabIndex == 0) {
    //     setTimeout(() => {
    //       this.getGameList();
    //     }, 1000);
    //   } else if (this.selectedTabIndex == 3) {
    //     this.getVirtualGameList();
    //   }
    //   this.activeGameIds = [];
    // }, 1000)
    }) }



    getActivateGame() {
    //   if (!this.isActiveGamesInTransit) {
    //     this.isActiveGamesInTransit = true;
    //     this.activeGames = [];
    //     this.loadingService.setLoading(true);
    //     let activeGameSub = this.eventsService
    //       .activateListGame()
    //       .pipe(finalize(() => (this.isActiveGamesInTransit = false)))
    //       .subscribe((res: any) => {
    //         if (res && res.errorCode === 0 && res.result.length) {
    //           this.activeGamesHolder = res.result;
    //           this.totalOnlineUser = this.activeGamesHolder[0].usersLogged;
    //           this.activeGamesHolder.map((event) => {
    //             if (+event.eventTypeId === 1) {
    //               event.markets = event.markets.sort((a, b) => {
    //                 return a.marketName > b.marketName ? 1 : -1;
    //               });
    //             }
    //           });
    //           this.activeGames = Object.assign([], this.activeGamesHolder).sort(
    //             (a, b) => Date.parse(a.time) - Date.parse(b.time)
    //           );
    //           this.filterSport();
    //         }
    //         this.loadingService.setLoading(false);
    //       });
    //     this.subSink.add(activeGameSub);
    //   }
    // }
}

toggleMarkets(id: any) {
  // let state = document.getElementById(id).style.display;
  // if (state === 'none') {
  //   document.getElementById(id).style.display = 'flex';
  //   event.target.className = 'expand-open';
  // } else {
  //   document.getElementById(id).style.display = 'none';
  //   event.target.className = 'expand-close';
  // }
}
// toggleExpand(event, id: any) {
//   let state = document.getElementById(id).style.display;
//   if (state === 'none') {
//     document.getElementById(id).style.display = 'table-row';
//     event.target.className = 'expand-open';
//   } else {
//     document.getElementById(id).style.display = 'none';
//     event.target.className = 'expand-close';
//   }
// }

mark:boolean=false;
expand(){
this.mark=true;
}
subtable:boolean=false;
subtab()
{
  this.subtable=true;

}

}
