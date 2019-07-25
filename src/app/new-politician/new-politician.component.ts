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
  success: boolean = false
  failed: boolean = false
  loading: boolean = false
  divisions = [];
  nics: string[] = [];
  politician: Politician = <Politician>new Object();
  msg = "";
  valid=true;
  constructor(private divService: DivisionService, private politicianService: PoliticianService, private idGenerateService: IdGenerateService) { }

  ngOnInit() {
    this.divService.getAllDivisions().subscribe(res => this.divisions = res)
    this.politicianService.getAllPoliticians().subscribe(politicians => {
      this.nics = []
      politicians.forEach(pol => {
        this.nics.push(pol.nic)
      })
    })
  }

  onSubmit() {
    this.loading = true;

    this.politician.$class = "org.evotedapp.biznet.Politician"
    this.politician.politicianId = "pol" + this.idGenerateService.generate();
    this.politician.electoralDivision = "org.evotedapp.biznet.Division#" + this.politician.electoralDivision
    console.log(this.politician)
    this.politicianService.newPolitician(this.politician).subscribe(poli => {
      this.success = true;
      this.loading = false;
      this.failed = false;
      this.politician = new Politician();
      console.log(poli)
    }, err => {
      this.failed = true
      this.success = false;
      this.loading = false;
    })

  }

  checkNic() {
    if (this.politician.nic != undefined) {
      if (this.nics.includes(this.politician.nic)) {
        this.msg = "Politician already exsits"
        this.valid = false;
        console.log("exist")
      } else if (this.politician.nic.length != 10) {
        this.valid = false;
        this.msg = "Invalid NIC"
      } else if (!this.politician.nic.includes("v" || "V")) {
        this.msg = "NIC must include a v"
        this.valid = false;
      }
      else {
        this.msg = "";
        this.valid = true;
        console.log("not", this.nics)
      }
    }else{
      this.valid = false;
    }
  }
}
