import { Component, OnInit } from '@angular/core';
import { AreaModel } from 'src/app/models/parameters/area.model';
import { AreaService } from 'src/app/services/parameters/area.service';

declare const ShowNotificationMessage: any;
declare const ShowRemoveConfirmationModal: any;

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {

  recordList: AreaModel[];
  removeRecordId: String = '';

  constructor(private service: AreaService) { }

  ngOnInit(): void {
    this.getRecordList();
  }

  getRecordList() {

    this.service.getAllRecords().subscribe(
      records => {
        this.recordList = records;
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

  }
}
