import { Politician } from './../Model/Politician';
import { PrefVote } from './../Model/PrefVote';
import { Party } from './../Model/Party';
import { BallotService } from '../Services/ballot.service';
import { Ballot } from './../Model/Ballot';
import { Vote } from './../Model/Vote';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-summary',
  templateUrl: './vote-summary.component.html',
  styleUrls: ['./vote-summary.component.css']
})
export class VoteSummaryComponent implements OnInit {

  constructor(private data : DataService, private ballotService : BallotService) { }
  
  vote;

  partyId: string;
  party : Party;
  prefVotes : Politician[];
  partyName;
  ngOnInit() {
    this.data.data.subscribe(vote => {
      this.vote = vote
    
    })
    console.log(this.vote);
    this.partyId= <string>this.vote.partyid;
    this.party = <Party>this.vote.party;
    this.prefVotes= <Politician[]>this.vote.prefVotes;
    this.partyName = this.party.desc;
    
  }

  onCastBallot(){
    let ballot = new Ballot();

    ballot.ballotId = this.makeid();
    ballot.votedCandidates = this.prefVotes;
    ballot.votedParty = this.party;
    // ballot.timeStamp = "2019-03-07T22:32:22.029Z" 
    ballot.balStatus = "Casted"

    console.log(ballot)
    this.ballotService.castBallot(ballot);
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

}
