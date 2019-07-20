import { ElectionService } from './../Services/election.service';
import { ActivatedRoute } from '@angular/router';
import { ElectionResultService } from './../election-result.service';
import { Result } from './../Model/Result';
import { Election } from './../Model/Election';
import { Ballot } from './../Model/Ballot';
import { Component, OnInit } from '@angular/core';
import { Politician } from '../Model/Politician';
import { PoliticianService } from '../Services/politician.service';
import { RemoveNamespaceService } from '../remove-namespace.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css']
})
export class ResultDetailsComponent implements OnInit {
  allBallots:Ballot[] = []
  election:Election = new Election();

  result:Result = new Result();
  candidate:Politician = new Politician();
  constructor(private resultService:ElectionResultService, private route:ActivatedRoute, private electionService:ElectionService, private politicianService:PoliticianService, private removeNSService:RemoveNamespaceService, private data:DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let electId = param.get('electionId');
      let poliId = param.get('candidateId');
      this.electionService.getElection(electId).subscribe(election => {
        this.election = election;

        this.politicianService.getPolitician(poliId).subscribe(politician => {
            this.candidate = politician
            this.resultService.getResultsByElectionAndCandidate(election.electionId, this.candidate.politicianId).subscribe(bals => {
              this.result = new Result(); 
              this.result.resultId = "res_"+this.candidate.politicianId;            
              this.result.votes = bals.length;
              this.result.candidate = this.candidate;

            })
          })
        
      })
    })
  }

}
