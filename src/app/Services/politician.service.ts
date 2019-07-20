import { Politician } from './../Model/Politician';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoliticianService {

  url = "http://localhost:3000/api/Politician"
  constructor(private http:HttpClient) { }

  getAllPoliticians(){
    return this.http.get<Politician[]>(this.url);
  }

  getPolitician(politicianId){
    return this.http.get<Politician>(this.url+"/"+politicianId)
  }

  newPolitician(politician:Politician){
    return this.http.post(this.url, politician);
  }

}
