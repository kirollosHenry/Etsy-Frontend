import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationLangService {

  constructor(private http: HttpClient, private translate: TranslateService) { }

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
