import { Router } from '@angular/router';
import { RemoveNamespaceService } from './../remove-namespace.service';
import { PollingStation } from './../Model/PolingStation';
import { ElectionService } from './../Services/election.service';
import * as moment from 'moment';
import { Election } from '../Model/Election';
import { PoliticianService } from '../Services/politician.service';
import { Politician } from '../Model/Politician';
import { Component, OnInit } from '@angular/core';
import { IdGenerateService } from '../Services/id-generate.service';
import { DivisionService } from '../Services/division.service';


@Component({
  selector: 'app-new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.css']
})
export class NewElectionComponent implements OnInit {

  keyword:string = "";
  startTime = {hour: 8, minute: 0};
  endTime = {hour: 16, minute: 0};
  selectedPoliticians:Politician[]=[]
  allPoliticians:Politician[]=[]
  tempPoliticians:Politician[]=[]
  politicians:Politician[]=[]
  pollingStations:PollingStation[]=[]
  meridian = true;
  electionDate:Date = new Date();
  name:string = '';
  wizPage:number = 0;
  candidates:string[] = [];

  start:Date
  end:Date
  timeRange:string="";
  success:boolean = false
  failed:boolean = false
  loading:boolean = false
  election:Election;

  elecNames:string[] =[];
  msg: string = "";
  constructor(private politicianService:PoliticianService, private generator:IdGenerateService, private electionService:ElectionService, private divisionService:DivisionService, private removeNamespaceService:RemoveNamespaceService, private router:Router) { }

  ngOnInit() {
    this.allPoliticians = []
    this.electionService.viewAllElections().subscribe(elecs => {
      this.elecNames = []
      elecs.forEach(ele => {
        this.elecNames.push(ele.name);
      })
    })
    // this.election = new Election();
    this.divisionService.getAllDivisions().subscribe(divsions => {
      
      this.politicianService.getAllPoliticians().subscribe(politicians => {
      politicians.forEach(pol => {
        let polit = pol;
        let divId = this.removeNamespaceService.transform(pol.electoralDivision, "resource:org.evotedapp.biznet.Division#")
        let div = divsions.find(x => x.divisionId == divId)
        polit.electoralDivision = div.name
        this.allPoliticians.push(polit);
      })
      this.tempPoliticians = this.allPoliticians;
    })
    })
  


  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  findCandidates(){
    if(this.keyword != ""){
      this.allPoliticians = this.allPoliticians.filter(x => {
       return x.name.toLowerCase().includes(this.keyword.toLowerCase()) || x.party.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }else{
      this.allPoliticians = this.tempPoliticians;
    }
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
    this.loading = true
    this.success = false
    this.failed = false
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
      this.success = true;
      this.loading = false;
      this.failed = false;
      setTimeout(()=>{
      this.router.navigate(['elections'])
      }, 1500)
    }, err => {
      this.failed = true
      this.loading = false;
      this.success = false;
      console.log(err)
    })
  }

  nextBtn(){
    
      this.wizPage++;
      
      this.addToArr();
      this.start = new Date(this.electionDate);
      this.end = new Date(this.electionDate);

      this.start.setHours(this.startTime.hour)
      this.start.setMinutes(this.startTime.minute)
      this.end.setHours(this.endTime.hour)
      this.end.setHours(this.endTime.minute)

      // this.timeRange = this.start.getHours().toString()+" : "+start.getMinutes().toString() +" - "+ end.getHours().toString() +" : "+ end.getMinutes().toString()
    

    console.log(this.endTime.hour, this.endTime.minute)
  }

  prevBtn(){
    if(this.wizPage>0){
      this.wizPage--;
      if(this.wizPage == 1){
        this.selectedPoliticians = []
      }
    }
    console.log(this.wizPage)

  }

  checkName(){
    let name = this.name;

    if(name != ""){
      if(this.elecNames.includes(name)){
        this.msg = "Warning : Election name already exist !!"
      }else{
        this.msg = ""
      }
    }else{
      this.msg = "Election name is required!!"
    }
  }
}
