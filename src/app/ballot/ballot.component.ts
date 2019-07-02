import { BallotService } from '../Services/ballot.service';
import { DataService } from './../data.service';
import { Vote } from './../Model/Vote';
import { PrefVote } from './../Model/PrefVote';
import { Party } from '../Model/Party';
import { Component, OnInit } from '@angular/core';

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

  party;

  constructor(private data : DataService, private ballot : BallotService) { }


  // parties : Party[] = [{id : "prty001", name : "Sri Lanka Podujana Peramuna", , , ,desc : "Sri Lanka Podujana Peramuna", img : "../../assets/Podujana_Peramuna_logo.jpg"}, {id : "prty002", name : "Sri Lanka Freedom Party", desc : "Sri Lanka Freedom Party", img : "../../assets/SLFP.jpg"}, {id : "prty003", name : "Jathika Hela Urumaya", desc : "Jathika Hela Urumaya", img : "../../assets/JHU logo.jpg"}, {id : "prty004", name : "United National Party", desc : "United National Party", img : "../../assets/unp logo.jpg"}]
  prefvotes : PrefVote[] = [{number : 1, pName : "Mahinda rajapaksa", title:"Former President of Sri Lanka"}, {number : 2, pName : "Ranil Wikramasinghe", title:"Priminister of Sri Lanka"}, {number : 3, pName : "Namal Rajapaksa", title:"Parliment member of Sri Lanka"}, {number : 4, pName : "ooskdmfks", title:"lskmdvlskd of Sri Lanka"} , {number : 5, pName : "sd;km;sd", title:"Parliment member of Sri Lanka"}]
  selectedVotes: PrefVote[] = [];
  parties
  // prefVotes 
  ngOnInit() { 
    // this.parties.sort((a,b) => a.name.localeCompare(b.name));
    this.ballot.getParties().subscribe(res=> {
      console.log(res)
      this.parties = res;
    });

    // this.ballot.getPoliticians().subscribe(res=> {
    //   this.prefVotes = res;
    // })

    // this.ballot.getPrefVote().subscribe(res=> {
    //     this.prefVotes = res;
    //   })
  }
  
  cardOnClick(party) {
    
    this.party = party;
    this.activePartyId = party.id;
    this.msg = party.name + " is marked as voted";
  }

  spanOnClick(x) {
    
    if(this.selectedVotes.includes(x)){
      this.selectedVotes.splice(this.selectedVotes.indexOf(x), 1);
      this.votes = this.selectedVotes.length;
    }
    else {
      if(this.selectedVotes.length<3){
      this.selectedVotes.push(x);
      this.votes = this.selectedVotes.length;
      }     
    }
  }

  submitVote()  {
    let vote = new Vote();

    // vote.partyid = this.activePartyId;
    vote.party = this.party;
    vote.prefVotes = this.selectedVotes;
    
    this.data.sendData(vote);
  }
}
 