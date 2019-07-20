import { Vote } from './Model/Vote';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  vote:Vote = new Vote();
  private source = new BehaviorSubject("");
  data = this.source.asObservable();

  constructor() { }

  sendData(data) {
    this.source.next(data);
  }

  setBallot(vote:Vote){
    this.vote = vote
  }
}
