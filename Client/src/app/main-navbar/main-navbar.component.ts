import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [TranslateModule],
  providers: [TranslateService], 
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {

  private translate = inject(TranslateService);

  constructor(private router: Router) {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|tr/) ? browserLang : 'en');
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  navigateToAddPerson(): void {
    this.router.navigate(['/add-person']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}
