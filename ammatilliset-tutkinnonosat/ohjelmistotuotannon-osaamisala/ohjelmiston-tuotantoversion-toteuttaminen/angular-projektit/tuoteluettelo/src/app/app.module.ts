import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PuhelimetComponent } from './puhelimet/puhelimet.component';
import { Puhelin1Component } from './puhelin1/puhelin1.component';
@NgModule({
  declarations: [
    AppComponent,
    PuhelimetComponent,
    Puhelin1Component,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
      RouterModule.forRoot([
        {path: '', component: PuhelimetComponent},
        {path: 'puhelin1/:puhelin.id', component: Puhelin1Component},
      ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
