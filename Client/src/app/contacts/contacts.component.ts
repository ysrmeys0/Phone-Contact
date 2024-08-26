import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { contact } from '../../models/contact.models';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, TranslateModule],
  providers: [TranslateService], 
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: contact | null = null;
  private translate = inject(TranslateService);

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        if (id) {
          this.contactService.getContactById(id).subscribe({
            next: (contact: contact) => {
              this.selectedContact = contact;
            },
            error: (err) => {
              console.error('Error fetching contact:', err);
            }
          });
        }
      }
    });
  }

  onDelete(id: number): void {
    if (confirm(this.translate.instant('DELETE_CONFIRMATION'))) { 
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          alert(this.translate.instant('DELETE_SUCCESS')); 
          this.router.navigate(['/contacts']);
        },
        error: (err) => {
          console.error('Silme işlemi sırasında hata oluştu:', err);
          alert(this.translate.instant('DELETE_ERROR'));
        }
      });
    }
  }

  onUpdate(): void {
    if (this.selectedContact) {
      this.router.navigate(['/update-person', this.selectedContact.id]);
    }
  }
}
