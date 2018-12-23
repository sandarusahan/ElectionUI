import { BallotComponent } from './ballot/ballot.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteSummaryComponent } from './vote-summary/vote-summary.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'voting/ballot', component: BallotComponent },
  {path: 'voting/summary', component: VoteSummaryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
