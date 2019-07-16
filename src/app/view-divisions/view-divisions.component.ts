import { DivisionService } from './../Services/division.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-divisions',
  templateUrl: './view-divisions.component.html',
  styleUrls: ['./view-divisions.component.css']
})
export class ViewDivisionsComponent implements OnInit {
  divisions = [];
  constructor(private divisionService:DivisionService) { }

  ngOnInit() {
    this.divisionService.getAllDivisions().subscribe(divisions => {
      this.divisions = divisions;
      console.log(divisions);
    })
    
  }

}
