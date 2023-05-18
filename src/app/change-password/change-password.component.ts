import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from '../users/user-list/sub/password-strength.validator';
import { Router } from '@angular/router';
import { MyAccountService } from '../services/my-account.service';
import { GenericResponse } from '../shared/types/generic-response';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePassForm: FormGroup;
  submitted: boolean = false;
  isChangePassword: boolean = false;
  showDropDown:boolean=false;
  changePassModalOpen: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private myAccountService:MyAccountService 

  ){

  }
  ngOnInit(): void { 
    this.changePassForm = this.formBuilder.group(
      {
        userId: [, Validators.required],
        newpassword: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ]),
        ],
        confirm: [null, Validators.required],
        password: [, Validators.required],

        
      },
      { validators: ChangePasswordComponent.confirm }
    );
  }
  get c() {
    return this.changePassForm.get('confirm');
  }

  static confirm(formGroup: FormGroup) {
    const newpassword = formGroup.get('newpassword');
    const confirm = formGroup.get('confirm');

    return confirm?.dirty
      ? !!newpassword?.value && newpassword.value !== confirm.value
        ? { isNotMatching: true }
        : null
      : null;
  }
  get f() {
    return this.changePassForm;
  }
  changePass() {
    if (this.changePassForm.valid) {
      const { confirm, ...result } = this.changePassForm.value;
      this.myAccountService
        .changePassword(result)
        .subscribe((res: any) =>{
        //  console.log(res);
          if (res.errorCode === 0) {
            // this.toastr.success('Password changed successfully');
            console.log("password changed successfull")
            this.changePassModalOpen = false;
            this.f.controls['newpassword'].reset();
            this.f.controls['password'].reset();
            this.f.controls['confirm'].reset();
            this.router.navigateByUrl('/login');
          } else {
            // this.toastr.error(res.errorDescription);
          }
        });
    } else {
      if (this.f.errors && this.f.errors['isNotMatching']) {
        // this.toastr.error("Passwords don't match");
        console.log("passwords don't match ")
        return;
      }
      // this.toastr.error('Invalid Input');
    }
  }

}
