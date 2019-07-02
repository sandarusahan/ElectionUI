import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  url = "http://localhost:3000/api/system/historian"
  constructor(private http:HttpClient) { }

  getAllTransactions(){
    return this.http.get<any[]>(this.url)
  }
}
