import { Election } from './../Model/Election';
import { ElectionService } from './../Services/election.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-election',
  templateUrl: './current-election.component.html',
  styleUrls: ['./current-election.component.css']
})
export class CurrentElectionComponent implements OnInit {

  elections:Election[] = []
  filteredElections:Election[] = []

  constructor(private electionService:ElectionService) { }

  ngOnInit() {
    this.electionService.viewAllElections().subscribe(elections => {
      this.filteredElections = this.elections = elections;
      this.filteredElections = this.elections.filter(x => x.electionStatus == "Created" || x.electionStatus == "Voting_Started")
    })
  }

}
