import { PolingStation } from './../Model/PolingStation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollingStationService {

  url = "http://localhost:3000/api/PollingStation"
  constructor(private http:HttpClient) { }

  getAllPollingStations(){
    return this.http.get<PolingStation[]>(this.url)
  }

  addNewPollingStation(pollingStation){
    return this.http.post<PolingStation>(this.url, pollingStation)
  }
}
