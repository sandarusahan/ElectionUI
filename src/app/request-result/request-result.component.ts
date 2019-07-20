import { ElectionService } from './../Services/election.service';
import { Election } from './../Model/Election';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-result',
  templateUrl: './request-result.component.html',
  styleUrls: ['./request-result.component.css']
})
export class RequestResultComponent implements OnInit {

  elections:Election[] = []
  filteredElections:Election[] = []

  constructor(private electionService:ElectionService) { }

  ngOnInit() {
    this.electionService.viewAllElections().subscribe(elections => {
      this.filteredElections = this.elections = elections;
      this.filteredElections = this.elections.filter(x => x.electionStatus == "Voting_Ended")
    })
  }

}
