import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateCompiler, TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatToolbarModule, HttpClientModule, RouterOutlet, AsyncPipe, RouterModule, FormsModule, TranslateModule],
  providers: [TranslateService], 
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  person = {
    id: 0,
    name: '',
    surname: '',
    phoneNumber: '',
    companyName: '',
    companyPhoneNumber: '',
    email: '',
    birthday: undefined,
    profileImage: '',  
    favourite: false,
  };

  profileImageFile: File | null = null;
  formSubmitted = false;
  private translate = inject(TranslateService);

  constructor(private contactService: ContactService, private router: Router, private translateCompiler: TranslateCompiler) { }

  ngOnInit(): void {
    this.person.profileImage = '../../assets/defghi.png';
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.person.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.person.profileImage = '../../assets/defghi.png';
    }
  }

  onPhoneNumberChange() {
    console.log(this.translate.instant('PHONE_NUMBER_CHANGED'), this.person.phoneNumber);
  }

  toggleFavourite(): void {
    this.person.favourite = !this.person.favourite;
  }

  onSubmit(): void {
    this.contactService.checkPhoneNumber(this.person.phoneNumber).subscribe(
      (exists: boolean) => {
        if (exists) {
          alert(this.translate.instant('PHONE_EXISTS_ERROR'));
        } else {
          this.contactService.addContact(this.person).subscribe((contact) => {
            alert(this.translate.instant('CONTACT_ADDED_SUCCESS'));
            if (this.profileImageFile) {
              this.contactService.uploadProfileImage(contact.id, this.profileImageFile).subscribe(() => {
                this.router.navigate(['/details']);
              }, (err) => {
                console.error(this.translate.instant('IMAGE_UPLOAD_ERROR'), err); 
                alert(this.translate.instant('IMAGE_UPLOAD_ERROR')); 
              });
            } else {
              this.router.navigate(['/details']);
            }
          }, (err) => {
            console.error(this.translate.instant('CONTACT_ADD_ERROR'), err); 
            alert(this.translate.instant('CONTACT_ADD_ERROR'));
          });
        }
      });
  }
}
