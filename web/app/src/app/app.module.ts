import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomiserPageComponent } from './pages/home/randomiser-page/randomiser-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './pages/home/randomiser-page/items/items.component';
import { PartnersComponent } from './pages/home/randomiser-page/partners/partners.component';
import { BadgesAndMovesComponent } from './pages/home/randomiser-page/badges-and-moves/badges-and-moves.component';
import { MiscComponent } from './pages/home/randomiser-page/misc/misc.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RandomiserPageComponent,
    ItemsComponent,
    PartnersComponent,
    BadgesAndMovesComponent,
    MiscComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
