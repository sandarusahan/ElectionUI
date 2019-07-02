import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { CurrentElectionComponent } from './current-election/current-election.component';
import { ElectionsComponent } from './elections/elections.component';
import { PoliticiansComponent } from './politicians/politicians.component';
import { BallotComponent } from './ballot/ballot.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteSummaryComponent } from './vote-summary/vote-summary.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'politicians', component: PoliticiansComponent},
  {path: 'current-elections', component: CurrentElectionComponent},
  {path: 'transactions', component: ViewAllTransactionsComponent},
  {path: 'elections', component: ElectionsComponent},
  {path: 'voting/ballot', component: BallotComponent },
  {path: 'voting/summary', component: VoteSummaryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
