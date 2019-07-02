import { Politician } from './Politician';
export class Party {
    partyId : string;
    name : string;
    leader : Politician;
    officeAddress : string;
    contactNumber : number;
    members: Politician[];
    officialWeb : string;
    desc : string;
    img : string;
}