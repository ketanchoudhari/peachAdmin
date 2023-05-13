import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { RunningMarketComponent } from './running-market/running-market.component';
import { MarketanaylsisComponent } from './marketanaylsis/marketanaylsis.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddaccountComponent } from './addaccount/addaccount.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SecurityAuthComponent } from './security-auth/security-auth.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ActiveUsersComponent,
    RunningMarketComponent,
    MarketanaylsisComponent,
    SidebarComponent,
    AddaccountComponent,
    ChangePasswordComponent,
    SecurityAuthComponent,
    MainComponent,
  ],

  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
