import { Ballot } from './Model/Ballot';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectionResultService {

  url = "http://localhost:3000/api/queries/"
  constructor(private http:HttpClient) { }

  getResultsByElection(election){
    return this.http.get<Ballot[]>(this.url+"getBallotsByElection?election=resource%3Aorg.evotedapp.biznet.Election%23"+election)
  }

  getResultsByElectionAndCandidate(electionid, candidateid){
    return this.http.get<Ballot[]>(this.url+"getBallotsByElectionAndCandidate?election=resource%3Aorg.evotedapp.biznet.Election%23"+electionid+"&candidate=resource%3Aorg.evotedapp.biznet.Politician%23"+candidateid)
  }
}
