import { PollingStationService } from './../Services/polling-station.service';
import { VoteKey } from './../Model/VoteKey';
import { VoteKeyService } from './../vote-key.service';
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

  constructor(private voteKeyService:VoteKeyService, private data : DataService, private ballotService : BallotService, private idGenerateService:IdGenerateService, private router:Router, private pollService:PollingStationService) { }
  vote_key: VoteKey = new VoteKey();
  
  vote:Vote;
  disable = false;
  partyId: string;
  party : Party;
  prefVotes : Politician[];
  partyName;

  voteKeys:string[] = []
  votedKeys:string[] = []

  success:boolean = false
  failed:boolean = false
  loading:boolean = false
  success_key:boolean = false
  failed_key:boolean = false
  loading_key:boolean = false
  msg = ""
  countdown = 5;
  ngOnInit() {
    
    this.vote = this.data.vote
    console.log(this.data.vote.election);
    this.pollService.getPollingStation(sessionStorage.getItem('pollingStation')).subscribe(poll =>{
      this.voteKeys = [];
      poll.voteKeys.forEach(key => {
        this.voteKeys.push(key);
      })
    })

    this.voteKeyService.getAllVotedKeysByPollingStions("resource:org.evotedapp.biznet.PollingStation#"+sessionStorage.getItem('pollingStation'), "resource:org.evotedapp.biznet.Election#"+this.vote.election.electionId).subscribe(keys => {
      this.votedKeys = [];
      keys.forEach(key => this.votedKeys.push(key.votedKey))
      

    })
  }

  onCastBallot(){
    this.loading = true;
    this.failed = false;
    this.success = false;
    let ballot = new Ballot();

    ballot.$class="org.evotedapp.biznet.VoteTransaction";
    ballot.ballotId = "bal"+this.idGenerateService.generate();
    ballot.votedCandidate = "org.evotedapp.biznet.Politician#" + this.vote.votedCandidate.politicianId
    ballot.votedPolingStation = "org.evotedapp.biznet.PollingStation#"+sessionStorage.getItem('pollingStation')                   // \\ ......................................session
    
    ballot.election = "org.evotedapp.biznet.Election#"+this.vote.election.electionId
    
    console.log(ballot)
    this.ballotService.castBallot(ballot).subscribe(vt => {
      console.log(vt);
      this.loading = false;
      this.success = true;
      this.failed = false;
      this.disable = true;
      this.voteKeyService.addVoteKey(this.vote_key).subscribe(voteKey => {
        console.log(voteKey)
      })
      
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
      interval(1000).subscribe(x => {
        this.countdown = 5 - x

        if(this.countdown == 0){
          this.goBack()
        }
      })
    });
  }

  goBack(){
    this.router.navigate(['voting', 'ballot', this.vote.election.electionId])
  }
  
  voteKeyOnPress(key){
    this.success_key = false;
    this.failed_key = false;
    this.loading_key = true;
    interval(1000).subscribe(t =>{
      if(t == 5){
        this.vote_key = new VoteKey();
        this.vote_key.$class = "org.evotedapp.biznet.ballotKeyVerify";
        this.vote_key.ballotKeyVerifyId = "vk"+this.idGenerateService.generate();
        this.vote_key.election = "org.evotedapp.biznet.Election#"+this.vote.election.electionId;
        this.vote_key.pollingStation = "org.evotedapp.biznet.PollingStation#"+sessionStorage.getItem('pollingStation')
        this.vote_key.votedKey = key;
    
        console.log(key)
        if(!this.votedKeys.includes(key)){
          if(this.voteKeys.includes(key)){
            this.success_key = true;
            this.failed_key = false;
            this.loading_key = false;
            this.msg = ""
            
          }else{
            this.success_key = false;
            this.failed_key = true;
            this.loading_key = false;
            this.msg = "Vote key invalid"

          }
        }else{
          this.success_key = false;
          this.failed_key = true;
          this.loading_key = false;
          this.msg = "Vote has already used"

        }
        
      }
    })
    
    
  }
}
