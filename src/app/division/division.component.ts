import { Division } from './../Model/Division';
import { IdGenerateService } from './../Services/id-generate.service';
import { DivisionService } from './../Services/division.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  success:boolean = false
  failed:boolean = false
  loading:boolean = false
  division:Division = new Division()
  divNames:string[] = [];
  msg: string = "";
  constructor(private divisionService:DivisionService, private idService:IdGenerateService) { }

  ngOnInit() {
    this.divisionService.getAllDivisions().subscribe(divs => {
      this.divNames = [];
      divs.forEach(div => {
        this.divNames.push(div.name);
      })
    })
  }

  onSubmit(){
    this.loading = true;
    this.failed = false;
    this.success = false;
    this.division.$class = "org.evotedapp.biznet.Division"
    this.division.divisionId = "div"+this.idService.generate()
    this.divisionService.addNewDivision(this.division).subscribe(div => 
      {
        this.success = true;
        this.loading = false;
        this.failed = false;
        this.division.name = ""
        console.log(div)
      }, err => {
        this.failed = true
        this.loading = false;
        this.success = false;
      })
  }

  checkName(){
    let name = this.division.name;

    if(name != undefined){
      if(this.divNames.includes(name)){
        this.msg = "Warning : Division name already exist !!"
      }else{
        this.msg = ""
      }
    }else{
      this.msg = "Division name is required!!"
    }
  }
}
