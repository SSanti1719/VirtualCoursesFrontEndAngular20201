import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaModel } from 'src/app/models/parameters/area.model';
import { AreaService } from 'src/app/services/parameters/area.service';
import { StudentService } from 'src/app/services/student.service';

declare const ShowNotificationMessage: any;

@Component({
  selector: 'app-area-creation',
  templateUrl: './area-creation.component.html',
  styleUrls: ['./area-creation.component.css']
})
export class AreaCreationComponent implements OnInit {


  fgValidator: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AreaService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.FormBuilding();

  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  saveNewRecord() {
    if (this.fgValidator.invalid) {
      ShowNotificationMessage('Invalid Form');
    } else {
      let model = this.getRecordData();
      this.service.saveNewRecord(model).subscribe(
        data => {
          ShowNotificationMessage('Registro Exitoso, consulte la contraseña en su correo electronico');
          this.router.navigate(['/parameters/area'])
        }, error => {
          ShowNotificationMessage('Error registering data.');
        }
      );
    }
  }
  getRecordData(): AreaModel {
    let model = new AreaModel();
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}
