import { Router } from '@angular/router';
import { PollingStationService } from './../Services/polling-station.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private polService:PollingStationService, private router:Router) { }

  
  
  ngOnInit() {
    this.polService.getPollingStation(sessionStorage.getItem("pollingStation")).subscribe(ps => {
      if(ps.pollingStationId == sessionStorage.getItem("pollingStation")){
        this.polService.authenticated = true;

      }
    },err=>{
      if(sessionStorage.getItem('admin') == "true"){
        this.polService.authenticated = true;
        this.polService.admin = true;
      }else{
        this.polService.admin = false;
  
      }
    })
    
  }
  
  logout(){
    this.router.navigate(['/login'], { replaceUrl: true });
    sessionStorage.clear();
  }
}
