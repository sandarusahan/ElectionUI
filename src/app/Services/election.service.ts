import { Election } from './../Model/Election';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  url = "http://localhost:3000/api/Election"
  constructor(private http:HttpClient) { }

  viewAllElections(){
    return this.http.get<Election[]>(this.url)
  }
}
