import { PartyCard } from './../Model/PartyCard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  constructor() { }
  parties : PartyCard[] = [{id : "prty001", name : "Sri Lanka Podujana Peramuna", desc : "Sri Lanka Podujana Peramuna", img : "../../assets/Podujana_Peramuna_logo.jpg"}, {id : "prty002", name : "Sri Lanka Freedom Party", desc : "Sri Lanka Freedom Party", img : "../../assets/SLFP.jpg"}, {id : "prty003", name : "Jathika Hela Urumaya", desc : "Jathika Hela Urumaya", img : "../../assets/JHU logo.jpg"}, {id : "prty004", name : "United National Party", desc : "United National Party", img : "../../assets/unp logo.jpg"}]
  ngOnInit() {

  }

  cardOnClick(event) {
    console.log(event);
  }
}
