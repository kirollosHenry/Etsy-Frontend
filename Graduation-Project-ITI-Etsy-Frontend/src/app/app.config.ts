import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
<<<<<<< HEAD
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()),provideHttpClient(withInterceptors([]))]
=======
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppTranslateModule } from './app-translate.module';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
  importProvidersFrom(AppTranslateModule.forRoot())
  
  ]
>>>>>>> 3fd711c251abf782114bc0c7d5f893b04a306dc9
};
