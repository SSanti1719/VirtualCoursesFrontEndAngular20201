import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordModel } from 'src/app/models/security/change-password.model';
import { SecurityService } from 'src/app/services/security.service';
import MD5 from 'crypto-js/md5'

declare const ShowNotificationMessage:any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  fgValidator: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
   private router: Router
  ) { }

  ngOnInit(): void {

    this.FormBuilding();

  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    });
  }



  ChangePassword() {
    if (this.fgValidator.invalid || this.fgv.newPassword.value!=this.fgv.newPassword2.value) {
      console.log(this.fgv.newPassword.value);
      console.log(this.fgv.newPassword2.value);
      console.log(this.fgValidator);
      
      ShowNotificationMessage('Invalid Form');
    } else {
      let model = this.getChangePasswordData();
      this.service.ChangePassword(model).subscribe(
        data => {
          ShowNotificationMessage('Your password has been reset, please verify your cellphone or email');
          
          this.router.navigate(["/security/login"])
      },err=>{
        ShowNotificationMessage('Error procesing data');
        
      });
    }
  }

  getChangePasswordData():ChangePasswordModel {
    let model = new ChangePasswordModel();
    
    model.id = this.service.getUserId();
    model.currentPassword = MD5(this.fgv.currentPassword.value).toString();
    model.newPassword = MD5(this.fgv.newPassword.value).toString();
    console.log(model);
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }

}
