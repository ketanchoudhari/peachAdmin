import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService){}
  @ViewChild('modalDeposit') modalDeposit!: ElementRef;
  depositShow:boolean=false;
  withdrawShow:boolean=false;
  limitShow:boolean=false;
  creditShow:boolean=false;
  statusShow:boolean=false;
  passwordShow:boolean=false;

   toggelDeposit(){
    this.depositShow=!this.depositShow;
   }
  //  openModal() {
  //   const modal = this.modalDeposit.nativeElement;
  //   (modal).modal('show');
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
