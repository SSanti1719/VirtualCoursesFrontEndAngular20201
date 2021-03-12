import { Component, OnInit } from '@angular/core';
import { AreaModel } from 'src/app/models/parameters/area.model';
import { AreaService } from 'src/app/services/parameters/area.service';
import {NgxSpinnerService} from "ngx-spinner"
import { Router } from '@angular/router';



declare const ShowNotificationMessage: any;
declare const ShowNotificationMessage1: any;
declare const ShowRemoveConfirmationModal: any;
declare const closeModal:any;

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  page:number=1;
  recordList: AreaModel[];
  removeRecordId: String = '';

  constructor(private service: AreaService,
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
