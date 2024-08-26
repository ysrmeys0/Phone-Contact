import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AddPersonComponent } from './add-person/add-person.component'; 
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactService } from './contact.service';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './home/home.component';
import { ActionCellRendererComponent } from './action-cell-renderer/action-cell-renderer.component';
import { ImageCellRendererComponent } from './image-cell-renderer/image-cell-renderer.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomCompiler } from './custom-compiler';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AgGridModule,
    AppComponent,
    NavbarComponent,
    AddPersonComponent,
    ContactsComponent,
    HomeComponent,
    ActionCellRendererComponent,
    ImageCellRendererComponent,
    MainNavbarComponent,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    ContactService,
    TranslateService
  ],
})
export class AppModule {}
