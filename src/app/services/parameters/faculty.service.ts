import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  entity: String = 'faculty';
  token: String;

  constructor(private http: HttpClient,
    private securityServide: SecurityService) {

    this.token = this.securityServide.getToken();

  }

  /**
   * 
   * @returns Get all record of faculty collection
   */

  getAllRecords(): Observable<FacultyModel[]> {

    return this.http.get<FacultyModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);

  }
  getRecordById(recordId: String): Observable<FacultyModel> {

    return this.http.get<FacultyModel>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`);

  }

  saveNewRecord(record: FacultyModel): Observable<FacultyModel> {
    return this.http.post<FacultyModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
  editRecord(record: FacultyModel): Observable<FacultyModel> {
    return this.http.put<FacultyModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
  removeRecord(record: String): Observable<any> {
    return this.http.delete<any>(`${ServiceConfig.BASE_URL}${this.entity}/${record}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

}
