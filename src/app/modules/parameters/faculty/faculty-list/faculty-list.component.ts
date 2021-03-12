import { Component, OnInit } from '@angular/core';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { FacultyService } from 'src/app/services/parameters/faculty.service';
import {NgxSpinnerService} from "ngx-spinner"
import { Router } from '@angular/router';



declare const ShowNotificationMessage: any;
declare const ShowNotificationMessage1: any;
declare const ShowRemoveConfirmationModal: any;
declare const closeModal:any;

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {
  page:number=1;
  recordList: FacultyModel[];
  removeRecordId: String = '';

  constructor(private service: FacultyService,
    private spinner: NgxSpinnerService) {
      
     }

  ngOnInit(): void {
    this.spinner.show();
    
    this.getRecordList();
  }

  getRecordList() {
    this.service.getAllRecords().subscribe(
      records => {
        this.recordList = records;
        setTimeout(()=>{
          this.spinner.hide();
        },1000)
      },
      error => {
        ShowNotificationMessage("There is a problem with backend communication");
      }
    )
  }
  RemoveRecordConfirmation(id) {
    this.removeRecordId = id;
    ShowRemoveConfirmationModal();
  }

   RemoveRecord(){
    console.log(this.removeRecordId);
    this.service.removeRecord(this.removeRecordId).subscribe(
      data => {
        console.log("hola");
        closeModal("removeConfirmationModal")
        
        ShowNotificationMessage1('Registro eliminado correctamente');
        this.getRecordList();
      }, error => {
        ShowNotificationMessage('Error removing data.');
      })
  }
}

