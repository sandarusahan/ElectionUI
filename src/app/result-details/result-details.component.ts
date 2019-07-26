import { PollingStation } from './../Model/PolingStation';
import { HttpClient } from '@angular/common/http';
import { DivisionService } from './../Services/division.service';
import { ElectionService } from './../Services/election.service';
import { ActivatedRoute } from '@angular/router';
import { ElectionResultService } from '../Services/election-result.service';
import { Result } from './../Model/Result';
import { Election } from './../Model/Election';
import { Ballot } from './../Model/Ballot';
import { Component, OnInit } from '@angular/core';
import { Politician } from '../Model/Politician';
import { PoliticianService } from '../Services/politician.service';
import { RemoveNamespaceService } from '../remove-namespace.service';
import { DataService } from '../data.service';
import { DivisionVote } from '../Model/DivisionVote';
import { Division } from '../Model/Division';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css']
})
export class ResultDetailsComponent implements OnInit {
  allBallots:Ballot[] = []
  election:Election = new Election();

  divisions:DivisionVote[] = [];
  provinces:string[] = ["Central Province","Eastern Province","Northern Province","Southern Province","Western Province","NorthWestern Province","NorthCentral Province","Uva Province","Sabaragamuwa Province"]
  provinceVotes:{province:string, votes:number}[] = [];
  districtVotes:{district:string, votes:number}[] = [];
  result:Result = new Result();
  candidate:Politician = new Politician();
  constructor(private http:HttpClient,private resultService:ElectionResultService, private route:ActivatedRoute, private electionService:ElectionService, private politicianService:PoliticianService, private removeNSService:RemoveNamespaceService, private data:DataService, private divisionService:DivisionService) { }

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

              this.onDivisionTabSelect()
            })
          })
        
      })
    })


  }

  onDivisionTabSelect(){
    this.divisions = []
    this.districtVotes = []
    this.provinceVotes = []
    this.divisionService.getAllDivisions().subscribe(divs => {
      divs.forEach(division => {
        this.http.get<PollingStation[]>("http://localhost:3000/api/queries/getPollingStationByDivision?division=resource%3Aorg.evotedapp.biznet.Division%23"+division.divisionId).subscribe(polls => {
        polls.forEach(poll => {
          this.resultService.getResultByElectionAndCandidateAndPollingStation(this.election.electionId, this.candidate.politicianId, poll.pollingStationId).subscribe(bals => {
            let div = new DivisionVote();
            let prov = <{province:string, votes:number}> new Object();
            let dist = <{district:string, votes:number}> new Object();
              div.name = division.name;
              div.district = division.district;
              div.province = division.province;
              div.votes = bals.length;

              prov.province = division.province;
              prov.votes = bals.length;
            
              dist.district = division.district;
              dist.votes = bals.length;
            this.divisions.push(div);
            let p = this.provinceVotes.filter(x => x.province == prov.province)
            if(p.length==0){
              this.provinceVotes.push(prov)
            }else{
              prov.votes = prov.votes + p[1].votes
              this.provinceVotes.push(prov)
            }

            let d = this.districtVotes.filter(x => x.district == dist.district)
            if(d.length==0){
              this.districtVotes.push(dist)
            }else{
              dist.votes = dist.votes + d[1].votes
              this.districtVotes.push(div)
            }
          })
        })
        this.onProvinceTab();
        })
      })
    })
  }

  onProvinceTab(){
    this.provinces.forEach(prov => {
      this.http.get<Division[]>("http://localhost:3000/api/queries/getDivisionByProvince?province="+prov.replace(" ", "%20")).subscribe(divs => {
        divs.forEach(division => {

        })
      })
    })
  }

  
}
