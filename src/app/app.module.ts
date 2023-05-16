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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';



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
      HomeComponent,
  ],

  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),

  ],
  providers: [HttpClientModule, CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
