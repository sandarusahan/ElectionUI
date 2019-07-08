import { Politician } from './Politician';
import { Time } from "@angular/common";

export class Election {
  electionId:string
  name:string
  electionDate:Date
  startTime:Time
  endTime:Time
  electionStatus:string
  commissioner:string
  parties:string[]
  candidates:Politician[]
}