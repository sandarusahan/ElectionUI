import { Politician } from './Politician';
import { Time } from "@angular/common";

export class Election {
  $class:string
  electionId:string
  name:string
  electionDate:Date
  startTime:Date
  endTime:Date
  electionStatus:string
  commissioner:string
  parties:string[]
  candidates:String[]
}