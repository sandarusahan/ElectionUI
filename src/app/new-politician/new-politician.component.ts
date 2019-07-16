import { IdGenerateService } from './../Services/id-generate.service';
import { PoliticianService } from './../Services/politician.service';
import { Politician } from './../Model/Politician';
import { DivisionService } from './../Services/division.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-politician',
  templateUrl: './new-politician.component.html',
  styleUrls: ['./new-politician.component.css']
})
export class NewPoliticianComponent implements OnInit {
  success:boolean = false
  failed:boolean = false
  loading:boolean = false
  divisions=[];
  politician:Politician = <Politician> new Object();
  constructor(private divService:DivisionService, private politicianService:PoliticianService, private idGenerateService:IdGenerateService) { }

  ngOnInit() {
    this.divService.getAllDivisions().subscribe(res => this.divisions = res)
  }

  onSubmit(){
    this.loading = true;

    this.politician.$class = "org.evotedapp.biznet.Politician"
    this.politician.politicianId = "pol"+this.idGenerateService.generate();
    this.politician.electoralDivision = "org.evotedapp.biznet.Division#"+this.politician.electoralDivision
    console.log(this.politician)
    this.politicianService.newPolitician(this.politician).subscribe(poli => {
      this.success = true;
        this.loading = false;
        this.failed = false;
        this.politician = new Politician();
      console.log(poli)
    },err => {
      this.failed = true
      this.success = false;
      this.loading = false;
    })
    
  }
}
