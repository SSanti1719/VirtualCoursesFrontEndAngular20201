import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:SecurityService,private roouter:Router) { }

  ngOnInit(): void {
    this.service.Logout();
    this.roouter.navigate(["/home"]);
  }

}
