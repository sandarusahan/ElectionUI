import { PollingStationService } from './../Services/polling-station.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient, private pollingStationService:PollingStationService) { }

  ngOnInit() {
    this.http.head("http://localhost:3000/api/PollingStation/"+sessionStorage.getItem('pollingStation')).subscribe(exist =>{
      if(exist){
        this.pollingStationService.authenticated = true;
      }else{
        this.pollingStationService.authenticated = false;
      }
    }, err => {
      this.pollingStationService.authenticated = false;
    })
    
  }

}
