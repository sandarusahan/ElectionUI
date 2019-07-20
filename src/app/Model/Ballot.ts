import { Party } from './Party';
import { Politician } from './Politician';
export class Ballot {
    $class:string
    ballotId : string
    // votedParty : Party
    votedCandidate : string;
    votedPolingStation:string;
    election:string;
    balStatus : string;
}