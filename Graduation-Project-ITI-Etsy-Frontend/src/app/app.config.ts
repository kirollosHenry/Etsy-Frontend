import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AppTranslateModule } from './app-translate.module';
import { TranslationLangService } from './Services/translation/translationLang.service';
import { DatePipe } from '@angular/common';
import { authInterceptor } from './Services/Authentication/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([ authInterceptor])),
    importProvidersFrom(HttpClientModule),
  importProvidersFrom(AppTranslateModule.forRoot()),

  {
    provide: APP_INITIALIZER,
    useFactory: (translationService: TranslationLangService) => () => translationService.init(),
    deps: [TranslationLangService],
    multi: true
  },
  DatePipe
]
};
