import { Router } from '@angular/router';
import { IdGenerateService } from './../Services/id-generate.service';
import { Politician } from './../Model/Politician';
import { PrefVote } from './../Model/PrefVote';
import { Party } from './../Model/Party';
import { BallotService } from '../Services/ballot.service';
import { Ballot } from './../Model/Ballot';
import { Vote } from './../Model/Vote';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-vote-summary',
  templateUrl: './vote-summary.component.html',
  styleUrls: ['./vote-summary.component.css']
})
export class VoteSummaryComponent implements OnInit {

  constructor(private data : DataService, private ballotService : BallotService, private idGenerateService:IdGenerateService, private router:Router) { }
  
  vote:Vote;
  disable = false;
  partyId: string;
  party : Party;
  prefVotes : Politician[];
  partyName;

  success:boolean = false
  failed:boolean = false
  loading:boolean = false
  success_key:boolean = false
  failed_key:boolean = false
  loading_key:boolean = false

  countdown = 5;
  ngOnInit() {
    
    this.vote = this.data.vote
    console.log(this.data.vote.election);
    
  }

  onCastBallot(){
    this.loading = true;
    this.failed = false;
    this.success = false;
    let ballot = new Ballot();

    ballot.$class="org.evotedapp.biznet.VoteTransaction";
    ballot.ballotId = "bal"+this.idGenerateService.generate();
    ballot.votedCandidate = "org.evotedapp.biznet.Politician#" + this.vote.votedCandidate.politicianId
    ballot.votedPolingStation = "org.evotedapp.biznet.PollingStation#ps820793"                   // \\ ......................................session
    
    ballot.election = "org.evotedapp.biznet.Election#"+this.vote.election.electionId
    
    console.log(ballot)
    this.ballotService.castBallot(ballot).subscribe(vt => {
      console.log(vt);
      this.loading = false;
      this.success = true;
      this.failed = false;
      this.disable = true;
      interval(1000).subscribe(x => {
        this.countdown = 5 - x

        if(this.countdown == 0){
          this.goBack()
        }
      })
    }, err => {
      this.failed = true;
      this.loading = false;
      this.success = false;
    });
  }

  goBack(){
    this.router.navigate(['voting', 'ballot', this.vote.election.electionId])
  }
  
  voteKeyOnPress(key){
    let vote_key:string = "x0x0x0x"
    let flag = false;
    console.log(key)
    this.success_key = false;
    this.failed_key = false;
    this.loading_key = true;

    if(vote_key != key){
      // setTimeout(()=>{
          this.success_key = false;
          this.failed_key = true;
          this.loading_key = false;
        
      // }, 3000)
      
    }else{
      this.success_key = true;
      this.failed_key = false;
      this.loading_key = false;      
    }
  }
}
