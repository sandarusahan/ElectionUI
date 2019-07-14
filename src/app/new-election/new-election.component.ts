import { ElectionService } from './../Services/election.service';
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
  wizPage:number = 0;
  candidates:string[] = [];

  election:Election;

  constructor(private politicianService:PoliticianService, private generator:IdGenerateService, private electionService:ElectionService) { }

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
    this.selectedPoliticians.forEach(politician => {
      this.candidates.push("org.evotedapp.biznet.Politician#"+politician.politicianId)
    })
    
  }

  onSubmit(){
    let election = new Election();
    election.$class="org.evotedapp.biznet.NewElectionTransaction"
    election.electionId = "el"+this.generator.generate();
    election.name = this.name;
    election.candidates = this.candidates;
    election.startTime = <Date> new Date(this.electionDate)
    election.endTime = <Date> new Date(this.electionDate)
    election.startTime.setHours(this.startTime.hour, this.startTime.minute);
    election.startTime.setMinutes(this.startTime.minute);
    election.endTime.setHours(this.endTime.hour);
    election.endTime.setMinutes(this.endTime.minute);
    election.commissioner = "org.evotedapp.biznet.ElectionCommissioner#com0001";
    election.electionDate = this.electionDate;
    console.log(election)
    this.election = election;
    this.electionService.newElection(election).subscribe(elec => {
      console.log(elec)
    }, err => {
      console.log(err)
    })
  }

  nextBtn(){
    if(this.wizPage<2)
    this.wizPage++;
    this.addToArr();

    console.log(this.wizPage)
  }

  prevBtn(){
    if(this.wizPage>0){
      this.wizPage--;
    }
    console.log(this.wizPage)

  }
}
