import { PartyCard } from './../Model/PartyCard';
import { Component, OnInit, Pipe } from '@angular/core';
import { dirtyParentQueries } from '@angular/core/src/view/query';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  isActive;
  msg = "Click to mark your vote"
  constructor() { }
  parties : PartyCard[] = [{id : "prty001", name : "Sri Lanka Podujana Peramuna", desc : "Sri Lanka Podujana Peramuna", img : "../../assets/Podujana_Peramuna_logo.jpg"}, {id : "prty002", name : "Sri Lanka Freedom Party", desc : "Sri Lanka Freedom Party", img : "../../assets/SLFP.jpg"}, {id : "prty003", name : "Jathika Hela Urumaya", desc : "Jathika Hela Urumaya", img : "../../assets/JHU logo.jpg"}, {id : "prty004", name : "United National Party", desc : "United National Party", img : "../../assets/unp logo.jpg"}]
  
  // should be sorted accoding to name of the party
  
  ngOnInit() {
    this.parties.sort((a,b) => a.name.localeCompare(b.name));
  }
  
  cardOnClick(party) {
    
    this.isActive = party.id;
    this.msg = party.name + " is marked as voted"
    console.log(party);
  }
}
 