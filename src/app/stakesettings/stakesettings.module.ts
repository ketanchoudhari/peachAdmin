import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StakesettingsComponent } from './stakesettings.component';
import { RouterModule, Routes } from '@angular/router';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';

const routes: Routes = [
  {
    path:'',
    component:StakesettingsComponent
  }
  
]

@NgModule({
  declarations: [StakesettingsComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DirectivesModule,
    FormsModule

  ],
  exports:[RouterModule]

  
})
export class StakesettingsModule { }
