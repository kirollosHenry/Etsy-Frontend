import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationLangService {
  

  constructor(private http: HttpClient, private translate: TranslateService) { }

  init(): Promise<void> { // Add void here to indicate that the promise resolves without a value
    return new Promise<void>((resolve, reject) => {
      const lang = localStorage.getItem('lang') || 'en';
      this.setLanguage(lang);
      // You may also want to load translations here if needed
      // Example: this.loadTranslationFile(lang).subscribe(() => resolve(), error => reject(error));
      resolve(); // Resolve without passing any value
    });
  }

  loadTranslationFile(language: string): Observable<any> {
    return this.http.get(`assets/i18n/${language}.json`);
  }

  setLanguage(language: string): void {
    this.translate.use(language);
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }

}
