import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePassForm!: FormGroup;
  submitted: boolean = false;
  isChangePassword: boolean = false;
  showDropDown:boolean=false;



  constructor(
    private fb:FormBuilder,

  ){

  }
  ngOnInit(): void {
    

  
  
    
  }


}
