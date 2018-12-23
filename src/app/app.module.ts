import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BallotComponent } from './ballot/ballot.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NumToArrPipe } from './num-to-arr.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    BallotComponent,
    NavbarComponent,
    NumToArrPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
