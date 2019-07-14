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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  isSelected = null;
  activePartyId = null;
  activeSpan;
  votes = 0;
  msg = "Click to mark your vote"

  election:Election;
  candidates:Politician[] = []
  candidatesIds:string[] = []

  constructor(private data : DataService, private ballot : BallotService, private route:ActivatedRoute, private electionService:ElectionService, private removeNSService:RemoveNamespaceService, private politicianService:PoliticianService) { }


  ngOnInit() { 
   
    this.route.paramMap.subscribe(param => {
      let id = param.get('electionId');
      this.electionService.getElection(id).subscribe(election => {
        this.election = election;
        this.candidatesIds = []
        this.election.candidates.forEach(candidate => this.candidatesIds.push(this.removeNSService.transform(candidate, "resource:org.evotedapp.biznet.Politician#")))
        
      })
    })

    this.politicianService.getAllPoliticians().subscribe(politicians => {
      this.candidates = []
      this.candidatesIds.forEach(poliId => {
        this.candidates.push(politicians.find(x => x.politicianId == poliId))
      })
    })
  }
  
  // cardOnClick(candidate) {
    
  //   this.party = party;
  //   this.activePartyId = party.id;
  //   this.msg = party.name + " is marked as voted";
  // }

 

  submitVote()  {
    let vote = new Vote();

    // vote.partyid = this.activePartyId;
    // vote.party = this.party;
    // vote.prefVotes = this.selectedVotes;
    
    this.data.sendData(vote);
  }
}
 