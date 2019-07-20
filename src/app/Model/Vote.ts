import { Election } from './Election';
import { PollingStation } from './PolingStation';
import { Party } from './Party';
import { PrefVote } from "./PrefVote";
import { Politician } from './Politician';

export class Vote {
    ballotId : string
    // votedParty : Party
    votedCandidate : Politician;
    votedPolingStation:PollingStation;
    election:Election;
    balStatus : string;


}