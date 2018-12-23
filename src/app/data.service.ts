import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private source = new BehaviorSubject("");
  data = this.source.asObservable();

  constructor() { }

  sendData(data) {
    this.source.next(data);
  }
}
