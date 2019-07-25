import { PollingStation } from './../Model/PolingStation';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Election } from './../Model/Election';
import { ElectionService } from './../Services/election.service';
import { Component, OnInit } from '@angular/core';
import { PollingStationService } from '../Services/polling-station.service';

@Component({
  selector: 'app-current-election',
  templateUrl: './current-election.component.html',
  styleUrls: ['./current-election.component.css']
})
export class CurrentElectionComponent implements OnInit {

  elections:Election[] = []
  filteredElections:Election[] = []

  constructor(private http:HttpClient,private electionService:ElectionService, private pollingStationService:PollingStationService, private router:Router) { }

  ngOnInit() {
    this.http.get<PollingStation>("http://localhost:3000/api/PollingStation/"+sessionStorage.getItem('pollingStation')).subscribe(exist =>{
      if(exist.pollingStationId == sessionStorage.getItem('pollingStation')){
        this.pollingStationService.authenticated = true;
        this.electionService.viewAllElections().subscribe(elections => {
          this.filteredElections = this.elections = elections;
          this.filteredElections = this.elections.filter(x => x.electionStatus == "Created" || x.electionStatus == "Voting_Started")
        })
      }else{
        this.pollingStationService.authenticated = false;
        this.router.navigate(["login"])
      }
    }, err => {
      this.pollingStationService.authenticated = false;
      this.router.navigate(["login"])

    })
    
  }

}
