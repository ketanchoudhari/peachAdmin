import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmComponent } from './mm/mm.component';
import { RouterModule, Routes } from '@angular/router';
import { BetListComponent } from './bet-list/bet-list.component';
import { BetListLiveComponent } from './bet-list-live/bet-list-live.component';
import { RiskManagementComponent } from './risk-management/risk-management.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbAlertModule, NgbNavModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { RacesComponent } from './races/races.component';
import { SportsComponent } from './sports/sports.component';

const routes: Routes = [
  {
    path:'mmc',
    component:MmComponent
  },
  {
    path:'bet-list',
    component:BetListComponent,
  },
  {
    path:'bet-list-live',
    component:BetListLiveComponent,
  },
  {
    path:'risk-management',
    component:RiskManagementComponent,
  },
  {
    path:'race',
    component:RacesComponent,

  },
  {
    path:'sports',
    component:SportsComponent,
  }
]

@NgModule({
  declarations: [
    MmComponent,
    BetListComponent,
    BetListLiveComponent,
    RiskManagementComponent,
    RacesComponent,
    SportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgbNavModule,
    NgbAlertModule,
    NgbTimepickerModule,
    ModalModule,
    FormsModule,
  ],
  exports:[RouterModule]
})
export class ManagementModule { }
