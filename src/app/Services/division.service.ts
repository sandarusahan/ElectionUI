import { Division } from './../Model/Division';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  url = "http://localhost:3000/api/Division"

  constructor(private http:HttpClient) { 
    
  }

  getAllDivisions(){
    return this.http.get<Division[]>(this.url)
  }

  addNewDivision(division){
    return this.http.post(this.url, division)
  }
}
