import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from "./navbar/navbar.component";
import { AddPersonComponent } from './add-person/add-person.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactService } from './contact.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActionCellRendererComponent } from './action-cell-renderer/action-cell-renderer.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { contact } from '../models/contact.models';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, AsyncPipe, CommonModule, 
    MatSidenavModule, MatIconModule, MatToolbarModule, 
    NavbarComponent, AddPersonComponent, ContactsComponent, 
    HomeComponent, ActionCellRendererComponent, MainNavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);

  showNavbar: boolean = true;
  contacts: contact[] = [];
  selectedContact: contact | null = null;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private contactService: ContactService, 
    private router: Router,
    private translate: TranslateService
  ) { 
    this.handleNavigation();
  }

  ngOnInit(): void {
    this.loadContacts();
    this.translate.setDefaultLang('en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  private handleNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.urlAfterRedirects !== '/home';
      }
    });
  }

  private loadContacts() {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  onContactSelected(contact: contact) {
    this.selectedContact = contact;
  }
}
