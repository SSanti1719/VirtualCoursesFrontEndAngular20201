import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaModel } from 'src/app/models/parameters/area.model';
import { AreaService } from 'src/app/services/parameters/area.service';

declare const ShowNotificationMessage: any;

@Component({
  selector: 'app-area-edition',
  templateUrl: './area-edition.component.html',
  styleUrls: ['./area-edition.component.css']
})
export class AreaEditionComponent implements OnInit {

 
  fgValidator: FormGroup;
  recordId:String='';

  constructor(
    private fb: FormBuilder,
    private service: AreaService,
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
        this.router.navigate(["/parameters/area"]);
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
          this.router.navigate(['/parameters/area'])
        }, error => {
          ShowNotificationMessage('Error updating data.');
        }
      );
    }
  }
  getRecordData(): AreaModel {
    let model = new AreaModel();
    model.id = this.fgv.id.value;
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}
