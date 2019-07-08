import { Time } from '@angular/common';
import { Election } from '../Model/Election';
import { PoliticianService } from '../Services/politician.service';
import { Politician } from '../Model/Politician';
import { Component, OnInit } from '@angular/core';
import { IdGenerateService } from '../Services/id-generate.service';

@Component({
  selector: 'app-new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.css']
})
export class NewElectionComponent implements OnInit {

  startTime = {hour: 8, minute: 0};
  endTime = {hour: 16, minute: 0};
  selectedPoliticians:Politician[]=[]
  allPoliticians:Politician[]=[]
  politicians:Politician[]=[]
  meridian = true;
  electionDate:Date;
  name:string;

  constructor(private politicianService:PoliticianService, private generator:IdGenerateService) { }

  ngOnInit() {
    // this.election = new Election();
    this.politicianService.getAllPoliticians().subscribe(politicians => {
      this.allPoliticians = politicians;
    })
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  onSelect(index){
    let politician = this.allPoliticians[index];
    if(this.isExist(politician.politicianId)){
      this.selectedPoliticians.splice(this.selectedPoliticians.indexOf(politician),1);
    }else{
      this.selectedPoliticians.push(politician)

    }
  }

  isExist(poliId){
    let flag = false;
    let poli = this.selectedPoliticians.find(politician => politician.politicianId == poliId);
    if(poli != null){
      flag = true
    }else{
      flag = false;
    }
    return flag;
  }

  addToArr(){
    this.politicians = this.selectedPoliticians;
  }

  onSubmit(){
    let election = new Election();
    election.electionId = "el"+this.generator.generate();
    election.name = this.name;
    election.candidates = this.politicians;
    election.startTime = <Time> new Object()
    election.endTime = <Time> new Object()
    election.startTime.hours = this.startTime.hour;
    election.startTime.minutes = this.startTime.minute;
    election.endTime.hours = this.endTime.hour;
    election.endTime.minutes = this.endTime.minute;
    election.commissioner = "Commissioner";
    election.electionDate = this.electionDate;
    
    console.log(election)
  }
}
