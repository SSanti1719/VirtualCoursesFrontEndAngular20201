import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { FacultyService } from 'src/app/services/parameters/faculty.service';

declare const ShowNotificationMessage: any;

@Component({
  selector: 'app-faculty-edition',
  templateUrl: './faculty-edition.component.html',
  styleUrls: ['./faculty-edition.component.css']
})
export class FacultyEditionComponent implements OnInit {

 
  fgValidator: FormGroup;
  recordId:String='';

  constructor(
    private fb: FormBuilder,
    private service: FacultyService,
    private router: Router,
    private route:ActivatedRoute
  ) { 

    this.recordId=this.route.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.FormBuilding();
    this.getRecordBtId();
  }


  getRecordBtId(){
    this.service.getRecordById(this.recordId).subscribe(
      data=>{
        this.fgv.id.setValue(data.id);
        this.fgv.code.setValue(data.code);
        this.fgv.name.setValue(data.name);
      },
      error=>{
        ShowNotificationMessage('Recordnot found');
        this.router.navigate(["/parameters/faculty"]);
      }
    )
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      id: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  editNewRecord() {
    if (this.fgValidator.invalid) {
      ShowNotificationMessage('Invalid Form');
    } else {
      let model = this.getRecordData();
      this.service.editRecord(model).subscribe(
        data => {
          ShowNotificationMessage('Actualizacion Exitosa');
          this.router.navigate(['/parameters/faculty'])
        }, error => {
          ShowNotificationMessage('Error updating data.');
        }
      );
    }
  }
  getRecordData(): FacultyModel {
    let model = new FacultyModel();
    model.id = this.fgv.id.value;
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}
