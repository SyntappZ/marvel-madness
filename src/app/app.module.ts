import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material'

import { HttpClientModule }    from '@angular/common/http'

import { DataRequestService } from './data-request.service'

import { CharactersComponent } from './characters/characters.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    HomeComponent,
    GameComponent,
    FooterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [DataRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
