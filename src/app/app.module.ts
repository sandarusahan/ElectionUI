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
import { PolingStationComponent } from './poling-station/poling-station.component';
import { DivisionComponent } from './division/division.component';
import { NewPoliticianComponent } from './new-politician/new-politician.component';
import { ViewPollingStationsComponent } from './view-polling-stations/view-polling-stations.component';
import { ViewDivisionsComponent } from './view-divisions/view-divisions.component';
import { RequestResultComponent } from './request-result/request-result.component';
import { ElectionResultComponent } from './election-result/election-result.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { ViewPollingStationComponent } from './view-polling-station/view-polling-station.component';
import { LoginPollingStationComponent } from './login-polling-station/login-polling-station.component';
import { LoginComissionerComponent } from './login-comissioner/login-comissioner.component';

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
    NewElectionComponent,
    PolingStationComponent,
    DivisionComponent,
    NewPoliticianComponent,
    ViewPollingStationsComponent,
    ViewDivisionsComponent,
    RequestResultComponent,
    ElectionResultComponent,
    ResultDetailsComponent,
    ViewPollingStationComponent,
    LoginPollingStationComponent,
    LoginComissionerComponent
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
