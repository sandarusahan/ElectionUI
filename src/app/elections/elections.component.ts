import { Election } from './../Model/Election';
import { ElectionService } from './../Services/election.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {

  elections:Election[] = []
  constructor(private electionService:ElectionService) { }

  ngOnInit() {
    this.electionService.viewAllElections().subscribe(elections => {
      this.elections = elections
    })
  }

}
