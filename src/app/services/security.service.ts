import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from '../config/service.config';
import { StudentModel } from '../models/student.model';
import { UserModel } from '../models/security/user.model';
import { ResetPasswordComponent } from '../modules/security/reset-password/reset-password.component';
import { ResetPasswordModel } from '../models/security/reset-password.model';

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
ResetPassword(model:ResetPasswordModel):Observable<Boolean>{
  return this.http.post<Boolean>(`${ServiceConfig.BASE_URL}password-reset`, model, {
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

  sessionExists():Boolean{
    return (this.getSession()) ? true : false;
  }


  isUserRol(roleId):Boolean{
    let currentSession=this.getSession();
    return JSON.parse(currentSession).rol == roleId;
 
  }

  Logout(){
    localStorage.removeItem('session');
    this.setUserData(new UserModel());
  }

  getToken():String{
    let currentSession=this.getSession();
    return JSON.parse(currentSession).token;
  }
}
