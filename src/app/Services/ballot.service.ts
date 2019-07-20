import { Party } from '../Model/Party';
import { Ballot } from '../Model/Ballot';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BallotService {

  constructor(private http : HttpClient) { }

  url = "http://localhost:3000/api/"
  voteTxnUrl = "http://localhost:3000/api/VoteTransaction"

  getBallot() {
    return this.http.get<Ballot[]>(this.url+"Ballot")
  }

  castBallot(ballot : Ballot) {
    return this.http.post<Ballot>(this.voteTxnUrl, ballot)
  }

  getParties() {
    return this.http.get<Party>(this.url+"Party")
  }

  getPoliticians(){
    return this.http.get<Party>(this.url+"Politician")
  }

  getPrefVote() {
    return this.http.get(this.url+"PreferencialVoteNumber")
  }

  setPrefVote(prefvote) {
    return this.http.post<Ballot>(this.url+"PreferencialVoteNumber", prefvote).subscribe(
      ballot => {
        console.log(prefvote.preferentialVoteNumber + " set successfully ")
      }, 
      err => {
        console.log(err)
      }
    )
  }
}
