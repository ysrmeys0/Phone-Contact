// contact.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ContactsComponent } from '../contacts/contacts.component';
import { ContactService } from '../contact.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ContactsComponent],
  providers: [ContactService]
})
export class ContactModule {}