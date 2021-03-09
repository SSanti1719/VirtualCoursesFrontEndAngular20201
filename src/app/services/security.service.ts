import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from '../config/service.config';
import { StudentModel } from '../models/student.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userData = new BehaviorSubject<UserModel>(new UserModel());


  constructor(
    private http: HttpClient
  ) { 
this.verifyActiveSession()
  }

  verifyActiveSession(){
    let currentSession=this.getSession();
    if (currentSession) {
      let userData=JSON.parse(currentSession);
      this.setUserData(userData);
    }
  }

  setUserData(value: UserModel) {
    this.userData.next(value);

  }

  getUserData(){
    return this.userData.asObservable();
  }

  LoginUser(model: UserModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(`${ServiceConfig.BASE_URL}/login`, model, {
      headers: new HttpHeaders({

      })
    })
  }

  saveSession(sessionData: any): Boolean {
    let currentSession = localStorage.getItem('session');
    if (currentSession) {
      return false;
    } else {
      sessionData.isLogged = true;
      let data: UserModel = {
        id: sessionData.data.id,
        studentId: sessionData.data.studentId,
        username: sessionData.data.username,
        token: sessionData.token,
        isLogged: true,
        role:sessionData.data.role
      };
      localStorage.setItem('session', JSON.stringify(data));
      this.setUserData(data);
      return true;
    }
  }

  getSession() {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  Logout(){
    localStorage.removeItem('session');
    this.setUserData(new UserModel());
  }
}
