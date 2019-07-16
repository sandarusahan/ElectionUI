import { ViewPollingStationsComponent } from './view-polling-stations/view-polling-stations.component';
import { NewPoliticianComponent } from './new-politician/new-politician.component';
import { DivisionComponent } from './division/division.component';
import { PolingStationComponent } from './poling-station/poling-station.component';
import { NewElectionComponent } from './new-election/new-election.component';
import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { CurrentElectionComponent } from './current-election/current-election.component';
import { ElectionsComponent } from './elections/elections.component';
import { PoliticiansComponent } from './politicians/politicians.component';
import { BallotComponent } from './ballot/ballot.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteSummaryComponent } from './vote-summary/vote-summary.component';
import { ViewDivisionsComponent } from './view-divisions/view-divisions.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'politicians', component: PoliticiansComponent},
  {path: 'politicians/new', component: NewPoliticianComponent},
  {path: 'polling-station', component: ViewPollingStationsComponent},
  {path: 'polling-station/new', component: PolingStationComponent},
  {path: 'division', component: ViewDivisionsComponent},
  {path: 'division/new', component: DivisionComponent},
  {path: 'current-elections', component: CurrentElectionComponent},
  {path: 'transactions', component: ViewAllTransactionsComponent},
  {path: 'elections', component: ElectionsComponent},
  {path: 'new-election', component: NewElectionComponent},
  {path: 'voting/ballot/:electionId', component: BallotComponent },
  {path: 'voting/summary', component: VoteSummaryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
