import { DataService } from './../data.service';
import { Result } from './../Model/Result';
import { Ballot } from './../Model/Ballot';
import { RemoveNamespaceService } from './../remove-namespace.service';
import { PoliticianService } from './../Services/politician.service';
import { Election } from './../Model/Election';
import { ElectionService } from './../Services/election.service';
import { ActivatedRoute } from '@angular/router';
import { ElectionResultService } from '../Services/election-result.service';
import { Component, OnInit } from '@angular/core';
import { Politician } from '../Model/Politician';

@Component({
  selector: 'app-election-result',
  templateUrl: './election-result.component.html',
  styleUrls: ['./election-result.component.css']
})
export class ElectionResultComponent implements OnInit {
  // isSelected = null;
  // activeCandidateId = "";
  // activeSpan;
  // votes = 0;
  // msg = "Click to mark your vote"

  allVotes:number = 1000;
  declaredVotes:number = 0;
  rejectedVotes:number = 0;
  validVotes:number = 0;


  allBallots:Ballot[] = []
  election:Election = new Election();
  candidates:Politician[] = []
  candidatesIds:string[] = []

  results:Result[] = [];
  candidate:Politician = new Politician();
  constructor(private resultService:ElectionResultService, private route:ActivatedRoute, private electionService:ElectionService, private politicianService:PoliticianService, private removeNSService:RemoveNamespaceService, private dataService:DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let id = param.get('electionId');
      this.electionService.getElection(id).subscribe(election => {
        this.election = election;
        this.getAllVotesByElection(this.election.electionId);

        this.candidatesIds = []
        this.election.candidates.forEach(candidate => this.candidatesIds.push(this.removeNSService.transform(candidate, "resource:org.evotedapp.biznet.Politician#")))

        this.politicianService.getAllPoliticians().subscribe(politicians => {
          this.candidates = []
          this.results = []
          let i = 0
          this.candidatesIds.forEach(poliId => {
            i++;
            let candidate = politicians.find(x => x.politicianId == poliId)
            this.candidates.push(candidate);
            this.resultService.getResultsByElectionAndCandidate(election.electionId, candidate.politicianId).subscribe(bals => {
              let result = new Result(); 
              result.resultId = "res_"+candidate.politicianId;            
              result.votes = bals.length;
              result.candidate = candidate;
              this.validVotes = this.validVotes + bals.length;
              this.results.push(result);
            })
          })

        })
        
      })
    })
  }

 
  getAllVotesByElection(electionRef){
    console.log(electionRef)
    this.resultService.getResultsByElection(electionRef).subscribe(ballots => {
      this.declaredVotes = ballots.length;
      this.allBallots = ballots;
      console.log(ballots)
      ballots.forEach(bal => {
        if(bal.balStatus == 'Rejected'){
          this.rejectedVotes++;
        }
      })
      this.dataService.rejectedVotes = this.rejectedVotes
      this.dataService.declaredVotes = this.declaredVotes
      this.dataService.allVotes = this.allVotes

    })
  }

  get sortedCandidates() {
    return this.results.sort((a, b) => {
      return <any>new Date(b.votes) - <any>new Date(a.votes);
    });
  }
}
