import { PollingStation } from './../Model/PolingStation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollingStationService {

  url = "http://localhost:3000/api/PollingStation"
  constructor(private http:HttpClient) { }

  getAllPollingStations(){
    return this.http.get<PollingStation[]>(this.url)
  }

  addNewPollingStation(pollingStation){
    return this.http.post<PollingStation>(this.url, pollingStation)
  }
}
