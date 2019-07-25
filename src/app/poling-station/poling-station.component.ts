import { IdGenerateService } from './../Services/id-generate.service';
import { DivisionService } from './../Services/division.service';
import { PollingStationService } from './../Services/polling-station.service';
import { PollingStation } from './../Model/PolingStation';
import { Component, OnInit } from '@angular/core';
import { Division } from '../Model/Division';

@Component({
  selector: 'app-poling-station',
  templateUrl: './poling-station.component.html',
  styleUrls: ['./poling-station.component.css']
})
export class PolingStationComponent implements OnInit {
  success:boolean = false
  failed:boolean = false
  loading:boolean = false
  pollingStation:PollingStation = new PollingStation();
  divisions:Division[]=[];
  msg:string = "";
  pollsNames:string[] = []
  constructor(private pollingStationServcie:PollingStationService, private divisionService:DivisionService, private idGenerateService:IdGenerateService) { }

  ngOnInit() {
    this.pollingStationServcie.getAllPollingStations().subscribe(ps => {
      this.pollsNames = [];
      ps.forEach(poll => {
        this.pollsNames.push(poll.name);
      })
    })
    this.divisionService.getAllDivisions().subscribe(divs => {
      this.divisions = divs;
    })
  }

  onSubmit(){
    this.pollingStation.$class = "org.evotedapp.biznet.PollingStation"
    this.pollingStation.pollingStationId = "ps"+this.idGenerateService.generate();
    this.pollingStation.electoralDivision = "org.evotedapp.biznet.Division#"+this.pollingStation.electoralDivision
    this.pollingStation.voteKeys = this.generateVoteKeys(this.pollingStation.registeredVoters);
    this.pollingStation.password = "ps"+this.idGenerateService.generate()
    this.loading = true;
    this.success = false;
    this.failed = false;
    this.pollingStationServcie.addNewPollingStation(this.pollingStation).subscribe(polS => {
      console.log(polS)
      this.loading = false;
      this.success = true;
      this.failed = false;
    }, err => {
      this.loading = false;
      this.failed = true;
      this.success = false;
    })
  }

  onDiviClick(){
    this.divisionService.getAllDivisions().subscribe(divs => {
      this.divisions = divs;
    })
  }

  generateVoteKeys(amount){
    let keys:string[] = []
    for(let j = 0; j<amount; j++){
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      keys.push(result);
    }
    return keys;
  }

  checkName(){
    let name = this.pollingStation.name;

    if(name != undefined){
      if(this.pollsNames.includes(name)){
        this.msg = "Warning : Polling Station name already exist !!"
      }else{
        this.msg = ""
      }
    }else{
      this.msg = "Polling staion name is required!!"
    }
  }
}
