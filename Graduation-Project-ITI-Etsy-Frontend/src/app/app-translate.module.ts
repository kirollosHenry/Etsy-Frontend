import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';




const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json');

const TranslateCompilerFactory = () => new TranslateMessageFormatCompiler();

const translateLoader: Provider = {
  provide: TranslateLoader,
  useFactory: httpLoaderFactory,
  deps: [HttpClient]
}

const translateComiler: Provider = {
  provide: TranslateCompiler,
  useFactory: TranslateCompilerFactory
}

@NgModule({
  imports: [
    TranslateModule.forRoot(),
    CommonModule
  ]
})
export class AppTranslateModule {
  static forRoot(): ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
      loader: translateLoader,
      compiler: translateComiler
    });
  }

  static forChild(): ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
      loader: translateLoader,
      compiler: translateComiler,
      isolate: false
    });
  }

}
