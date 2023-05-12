import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmComponent } from './mm/mm.component';
import { RouterModule, Routes } from '@angular/router';
import { BetListComponent } from './bet-list/bet-list.component';
import { BetListLiveComponent } from './bet-list-live/bet-list-live.component';
import { RiskManagementComponent } from './risk-management/risk-management.component';

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
  }
]

@NgModule({
  declarations: [
    MmComponent,
    BetListComponent,
    BetListLiveComponent,
    RiskManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class ManagementModule { }
