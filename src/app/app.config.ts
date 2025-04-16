import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withFetch,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import {
  TranslateLoader,
  TranslateModule,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TablerIconsModule.pick(TablerIcons),
      MatNativeDateModule,
      MatSnackBarModule,
      NgScrollbarModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: {
        disabled: false,
        animation: {
          enterDuration: 0,
          exitDuration: 0,
        },
      },
    },
    TranslateStore,
  ],
};
