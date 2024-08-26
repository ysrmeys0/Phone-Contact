import { Component, EventEmitter, Output, ViewChild, inject, OnInit } from '@angular/core';
import { contact } from '../../models/contact.models';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNavList } from '@angular/material/list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from '../add-person/add-person.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatToolbarModule, HttpClientModule, RouterOutlet, AsyncPipe, RouterModule, AddPersonComponent, ContactsComponent, HomeComponent, TranslateModule],
  providers: [TranslateService], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private translate = inject(TranslateService);
  
  contacts: any[] = [];
  filteredContacts: any[] = [];

  constructor(private contactService: ContactService, private router: Router ) {}

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  selectContact(contact: any) {
    this.router.navigate(['/contacts', contact.id]);
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((data: any[]) => {
      this.contacts = data;
      this.filteredContacts = data;
    });
  }

  navigateToAddPerson(): void {
    this.router.navigate(['/add-person']);
  }

  searchContacts(searchTerm: string) {
    if (searchTerm === '') {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.surname.toLowerCase().includes(searchTerm.toLowerCase()) || contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || contact.companyPhoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
  }
}