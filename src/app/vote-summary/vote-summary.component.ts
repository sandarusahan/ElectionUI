import { Vote } from './../Model/Vote';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-summary',
  templateUrl: './vote-summary.component.html',
  styleUrls: ['./vote-summary.component.css']
})
export class VoteSummaryComponent implements OnInit {

  constructor(private data : DataService) { }

  vote;

  partyId: string;
  partyName: string;
  prefVotes;

  ngOnInit() {
    this.data.data.subscribe(vote => {
      this.vote = vote
    
    })
    console.log(this.vote);
    this.partyId= <string>this.vote.partyid;
    this.partyName = this.vote.partyName;
    this.prefVotes= <Vote[]>this.vote.prefVotes;

    
  }

}
