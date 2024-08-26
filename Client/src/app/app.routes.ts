import { Routes } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'add-person', component: AddPersonComponent },
  { path: 'contacts/:id', component: ContactsComponent },
  { path: 'update-person/:id', component: UpdatePersonComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' },
  
];
