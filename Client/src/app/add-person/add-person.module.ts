import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AddPersonComponent } from './add-person.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { appConfig } from '../app.config';
import { routes } from '../app.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(routes),
    AddPersonComponent,
    FormsModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: []
})
export class AddPersonModule { }

