import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { AreaModel } from 'src/app/models/parameters/area.model';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  entity:String='area';
  token: String;

  constructor(private http:HttpClient,
    private securityServide:SecurityService) { 

      this.token=this.securityServide.getToken();

  }

/**
 * 
 * @returns Get all record of area collection
 */

  getAllRecords():Observable<AreaModel[]>{

  return this.http.get<AreaModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);

}

saveNewRecord(record:AreaModel):Observable<AreaModel>{
  return this.http.post<AreaModel>(`${ServiceConfig.BASE_URL}${this.entity}`,record,{
    headers:new HttpHeaders({
      Authorization:`Bearer ${this.token}`
    })
  });

  
}

}
