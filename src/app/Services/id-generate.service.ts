import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGenerateService {

  constructor() { }


  generate(){
    return Math.floor(Math.random() * 1000000) + 1
  }
}
