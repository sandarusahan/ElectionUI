import { PollingStation } from './../Model/PolingStation';
import { PollingStationService } from './../Services/polling-station.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-polling-station',
  templateUrl: './view-polling-station.component.html',
  styleUrls: ['./view-polling-station.component.css']
})
export class ViewPollingStationComponent implements OnInit {

  pollingStation:PollingStation = new PollingStation();
  keys = [];
  reveal = false;
  username = ""
  password = ""
  constructor(private pollingStationService:PollingStationService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let id = param.get('pollId');
      this.pollingStationService.getPollingStation(id).subscribe(poll=>{
        this.keys = [];
        this.pollingStation = poll;
        this.keys = poll.voteKeys;
        this.username = poll.pollingStationId;
        this.password = poll.password;
      })
    })
  }




}
