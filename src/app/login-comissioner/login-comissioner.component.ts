import { PollingStationService } from './../Services/polling-station.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-comissioner',
  templateUrl: './login-comissioner.component.html',
  styleUrls: ['./login-comissioner.component.css']
})
export class LoginComissionerComponent implements OnInit {
  msg: string = "";

  constructor(private router:Router, private pollingStationService:PollingStationService) { }

  ngOnInit() {
    this.pollingStationService.login = true;
  }
  authenticateUser(form){
    if(form.username == "admin" && form.password == "admin123"){
      this.pollingStationService.login = false;
      this.pollingStationService.admin = true;
      this.pollingStationService.authenticated = true;
      sessionStorage.setItem('admin', "true")
      this.router.navigate([''])
    }else{
      this.msg = "Login Invalid"
      sessionStorage.setItem('admin', "false")
      this.pollingStationService.authenticated = false;

    }
  }
}
