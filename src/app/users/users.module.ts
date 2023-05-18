import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { SubComponent } from './user-list/sub/sub.component';



@NgModule({
  declarations: [
    UserListComponent,
    SubComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
