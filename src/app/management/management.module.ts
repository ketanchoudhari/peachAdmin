import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmComponent } from './mm/mm.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'mmc',
    component:MmComponent
  }
]

@NgModule({
  declarations: [
    MmComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class ManagementModule { }
