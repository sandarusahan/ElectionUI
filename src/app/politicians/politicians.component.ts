import { Politician } from './../Model/Politician';
import { PoliticianService } from './../Services/politician.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-politicians',
  templateUrl: './politicians.component.html',
  styleUrls: ['./politicians.component.css']
})
export class PoliticiansComponent implements OnInit {

  politicians:Politician[] = [];
  constructor(private politicianService : PoliticianService) { }

  ngOnInit() {
    this.politicianService.getAllPoliticians().subscribe(politicians => {
      this.politicians = politicians;
    })
  }

}
