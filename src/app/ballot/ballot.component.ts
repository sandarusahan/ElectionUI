import { element } from 'protractor';
import { PoliticianService } from './../Services/politician.service';
import { RemoveNamespaceService } from './../remove-namespace.service';
import { Politician } from './../Model/Politician';
import { Election } from './../Model/Election';
import { ElectionService } from './../Services/election.service';
import { BallotService } from '../Services/ballot.service';
import { DataService } from './../data.service';
import { Vote } from './../Model/Vote';
import { PrefVote } from './../Model/PrefVote';
import { Party } from '../Model/Party';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  isSelected = null;
  activeCandidateId = "";
  activeSpan;
  votes = 0;
  msg = ""

  ready = false;
  timeLeft:string;

  flag = true;
  intervalId;
  election:Election = new Election();
  candidates:Politician[] = []
  candidatesIds:string[] = []

  candidate:Politician = new Politician();

  electionTxn:{$class: string,currentElectionId: string} = <{$class: string,currentElectionId: string}>new Object();
  constructor(private data : DataService, private ballot : BallotService, private route:ActivatedRoute, private electionService:ElectionService, private removeNSService:RemoveNamespaceService, private politicianService:PoliticianService, private router:Router) { }


  ngOnInit() { 
  
    this.route.paramMap.subscribe(param => {
      let id = param.get('electionId');
      this.electionService.getElection(id).subscribe(election => {
        this.election = election;
        this.intervalId=setInterval(() => {
          this.handleElection(election);
        }, 1000)
        this.candidatesIds = []
        this.election.candidates.forEach(candidate => this.candidatesIds.push(this.removeNSService.transform(candidate, "resource:org.evotedapp.biznet.Politician#")))

        this.politicianService.getAllPoliticians().subscribe(politicians => {
          this.candidates = []
          this.candidatesIds.forEach(poliId => {
            this.candidates.push(politicians.find(x => x.politicianId == poliId))
          })
        })
        
      })
    })

    
    
  }
  
  cardOnClick(candidate:Politician) {    
    this.candidate = candidate;
    this.activeCandidateId = candidate.politicianId;
    this.msg = candidate.name + " is marked as voted";
  }

 

  submitVote(candidate:Politician)  {
    let vote = new Vote();
    if(candidate != null){
      vote.votedCandidate = candidate;
    }else{
      let candi = new Politician();
      candi.$class = "org.evotedapp.biznet.Politician";
      candi.politicianId = "000"
      candi.name = "No Body"
      candi.party = "This vote will be mark as rejected"

      vote.votedCandidate = candi;
    }
    vote.election = this.election;
    this.data.setBallot(vote);

    this.router.navigate(['voting', 'summary'])
  }

  handleElection(election){
    var sTime = new Date().getTime() - new Date(election.startTime).getTime();
    var eTime = new Date().getTime() - new Date(election.endTime).getTime();
    let t = (sTime/1000)
    if(sTime>0){
      this.ready = true;
      
      if(this.flag){
        this.startVotingTxn(election);
        this.flag = false;
      }
      if(eTime>0){
        this.ready = false;
        this.msg = "Election is over"
        this.endVotingTxn(election);
      }
    }else{
      this.ready = false;
      this.msg = "Election hasn't started yet"
      if(t > -60){
        this.msg + "(" +(t) + ")";
      }
      // this.timeLeft = t.getHours()+" : "+t.getMinutes()+" : "+t.getSeconds()
    }
  }

  startVotingTxn(election:Election){
    this.electionTxn.$class = "org.evotedapp.biznet.StartVotingTransaction";
    this.electionTxn.currentElectionId = election.electionId;
    this.electionService.startVoting(this.electionTxn).subscribe(res => console.log(console.log(res)))
  }

  endVotingTxn(election:Election){
    this.electionTxn.$class = "org.evotedapp.biznet.EndVotingTransaction";
    this.electionTxn.currentElectionId = election.electionId;
    this.electionService.endVoting(this.electionTxn).subscribe(res => {
      clearInterval(this.intervalId)
      this.router.navigate(['ended-elections'])
      console.log(res)
    })
  }
}
 