import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

declare const ShowNotificationMessage:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fgValidator: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.FormBuilding();

  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(5)]],
      document: ['', [Validators.required, Validators.minLength(7)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      cellphone: ['', [Validators.required, Validators.minLength(10)]],
      career: ['']
    });
  }

  StudentRegister() {
    if (this.fgValidator.invalid) {
      ShowNotificationMessage('Invalid Form');
    } else {
      let model = this.getStudentData();
      this.service.StudentRegister(model).subscribe(data => {
        console.log(data);
        if (data) {
          ShowNotificationMessage('Registro Exitoso, consulte la contraseña en su correo electronico');
          this.router.navigate(['/security/login'])
        } else {
          ShowNotificationMessage('Error registering data.');
        }

      });
    }
  }
  getStudentData(): StudentModel {
    let model = new StudentModel();
    model.code = this.fgv.code.value;
    model.document = this.fgv.document.value;
    model.name = this.fgv.name.value;
    model.lastname = this.fgv.lastname.value;
    model.email = this.fgv.email.value;
    model.phone = `${this.fgv.countryCode.value} ${this.fgv.cellphone.value}`;
    model.career = this.fgv.career.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}
