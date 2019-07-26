import { VoteKey } from './Model/VoteKey';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteKeyService {

  constructor(private http:HttpClient) { }

  addVoteKey(key:VoteKey){
    return this.http.post<VoteKey>("http://localhost:3000/api/ballotKeyVerify",key)
  }

  getAllVotedKeysByPollingStions(pollingStaionId, electionId){
    return this.http.get<VoteKey[]>("http://localhost:3000/api/queries/getBallotsVerifyKeyByElectionAndPollingStation?election=resource%3Aorg.evotedapp.biznet.Election%23"+electionId+"&pollingStation=resource%3Aorg.evotedapp.biznet.PollingStation%"+pollingStaionId)
  }
}
