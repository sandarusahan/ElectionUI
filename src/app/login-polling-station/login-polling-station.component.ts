import { Router } from '@angular/router';
import { PollingStationService } from './../Services/polling-station.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-polling-station',
  templateUrl: './login-polling-station.component.html',
  styleUrls: ['./login-polling-station.component.css']
})
export class LoginPollingStationComponent implements OnInit {

  msg = ''
  constructor(private pollingStationService:PollingStationService, private router:Router) { }

  ngOnInit() {
    this.pollingStationService.login = true;
    this.pollingStationService.admin = false;
  }

  authenticateUser(form){
    this.pollingStationService.getPollingStation(form.username).subscribe(res => {
      if(res.password == form.password){
        this.pollingStationService.login = false;
        this.router.navigate(['current-elections'])
        sessionStorage.setItem("pollingStation", res.pollingStationId)
      }
    }, err => {
      this.msg = "Login Error"
    })
    console.log(form)
  }
}
