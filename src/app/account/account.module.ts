import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { AccountSummeryComponent } from './account-summery/account-summery.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { BankingComponent } from './banking/banking.component';
import {  RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BankingLogComponent } from './banking/banking-log/banking-log.component';


const routes: Routes = [

  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'account-details',
    component:AccountDetailsComponent,
  },
  {
    path: 'account-Statement',
    component:AccountStatementComponent,
  },
  {
    path: 'account-sum',
    component:AccountSummeryComponent,
  },
  {
    path: 'banking',
    component:BankingComponent,
  },
  {
    path:'banking/banking-log',
    component:BankingLogComponent,
  }
 
]; 


@NgModule({
  declarations: [
    AccountStatementComponent,
    AccountSummeryComponent,
    AccountDetailsComponent,
    BankingComponent,
    BankingLogComponent,
  ],

  imports: [
    CommonModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
  
})
export class AccountModule { }
