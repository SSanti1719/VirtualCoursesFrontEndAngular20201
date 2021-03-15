import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { UserModel } from 'src/app/models/security/user.model';
import { SecurityService } from 'src/app/services/security.service';
import {ResetPasswordModel} from 'src/app/models/security/reset-password.model'
import MD5 from 'crypto-js/md5'

declare const ShowNotificationMessage:any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  fgValidator: FormGroup;
  document_min_length: number = FormsConfig.DOCUMENT_MIN;

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
      username: ['', [Validators.required, Validators.minLength(this.document_min_length)]],
      type: ['', [Validators.required]]
    });
  }

  ResetPassword() {
    if (this.fgValidator.invalid) {
      ShowNotificationMessage('Invalid Form');
    } else {
      let model = this.getResetPasswordData();
      this.service.ResetPassword(model).subscribe(
        data => {
          ShowNotificationMessage('Your password has been reset, please verify your cellphone or email');
          
          this.router.navigate(["/security/login"])
      },err=>{
        ShowNotificationMessage('Error procesing data');
        
      });
    }
  }
  getResetPasswordData(): ResetPasswordModel {
    let model = new ResetPasswordModel();
    console.log(model);
    
    model.username = this.fgv.username.value;
    model.type = parseInt(this.fgv.type.value);
    console.log(model);
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }

}
