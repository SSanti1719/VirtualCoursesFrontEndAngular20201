import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { FormsConfig } from 'src/app/config/forms-config'
import { SecurityService } from 'src/app/services/security.service';
import { UserModel } from 'src/app/models/security/user.model';
import MD5 from 'crypto-js/md5'


declare const ShowNotificationMessage:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidator: FormGroup;
  document_min_length: number = FormsConfig.DOCUMENT_MIN;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.FormBuilding();

  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.document_min_length)]],
      password: ['', [Validators.required]]
    });
  }

  LoginUser() {
    if (this.fgValidator.invalid) {
      ShowNotificationMessage('Invalid Form');
    } else {
      let model = this.getLoginData();
      this.service.LoginUser(model).subscribe(
        data => {
          ShowNotificationMessage('Welcome.');
          let res=this.service.saveSession(data);
          this.router.navigate(["/home"])
      },err=>{
        ShowNotificationMessage('Invalid data, please enter a correct user or password');
        
      });
    }
  }
  getLoginData(): UserModel {
    let model = new UserModel();
    model.username = this.fgv.username.value;
    model.password = MD5(this.fgv.password.value).toString();
    console.log(model);
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }

}
