import { Party } from './Party';
import { Politician } from './Politician';
export class Ballot {
    ballotId : string
    votedParty : Party
    votedCandidates : Politician[]
    balStatus : string
}