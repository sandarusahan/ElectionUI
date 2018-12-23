import { PrefVote } from './../Model/PrefVote';
import { PartyCard } from './../Model/PartyCard';
import { Component, OnInit, Pipe } from '@angular/core';
import { dirtyParentQueries } from '@angular/core/src/view/query';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  isSelected = null;
  isActive = null;
  activeSpan;
  votes = 0;
  msg = "Click to mark your vote"
  constructor() { }
  parties : PartyCard[] = [{id : "prty001", name : "Sri Lanka Podujana Peramuna", desc : "Sri Lanka Podujana Peramuna", img : "../../assets/Podujana_Peramuna_logo.jpg"}, {id : "prty002", name : "Sri Lanka Freedom Party", desc : "Sri Lanka Freedom Party", img : "../../assets/SLFP.jpg"}, {id : "prty003", name : "Jathika Hela Urumaya", desc : "Jathika Hela Urumaya", img : "../../assets/JHU logo.jpg"}, {id : "prty004", name : "United National Party", desc : "United National Party", img : "../../assets/unp logo.jpg"}]
  prefvotes : PrefVote[] = [{number : 1, pName : "Mahinda rajapaksa", title:"Former President of Sri Lanka"}, {number : 2, pName : "Ranil Wikramasinghe", title:"Priminister of Sri Lanka"}, {number : 3, pName : "Namal Rajapaksa", title:"Parliment member of Sri Lanka"}, {number : 4, pName : "ooskdmfks", title:"lskmdvlskd of Sri Lanka"} , {number : 5, pName : "sd;km;sd", title:"Parliment member of Sri Lanka"}]
  selectedVotes: PrefVote[] = [];
  
  ngOnInit() {
    this.parties.sort((a,b) => a.name.localeCompare(b.name));
  }
  
  cardOnClick(party) : string {
    
    this.isActive = party.id;
    this.msg = party.name + " is marked as voted";

    return party.id;
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
}
 