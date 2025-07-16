import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { securityInterceptorInterceptor } from './interceptors/security-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNativeDateAdapter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([ securityInterceptorInterceptor ])
    )
  ],
};
