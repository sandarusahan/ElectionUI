import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BallotComponent } from './ballot/ballot.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NumToArrPipe } from './num-to-arr.pipe';
import { VoteSummaryComponent } from './vote-summary/vote-summary.component';
import { PoliticiansComponent } from './politicians/politicians.component';
import { ElectionsComponent } from './elections/elections.component';
import { CurrentElectionComponent } from './current-election/current-election.component';
import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { RemoveNamespacePipe } from './remove-namespace.pipe';
import { NewElectionComponent } from './new-election/new-election.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    BallotComponent,
    NavbarComponent,
    NumToArrPipe,
    VoteSummaryComponent,
    PoliticiansComponent,
    ElectionsComponent,
    CurrentElectionComponent,
    ViewAllTransactionsComponent,
    RemoveNamespacePipe,
    NewElectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
