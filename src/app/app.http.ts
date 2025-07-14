import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const httpInterceptorProviders = [
  provideHttpClient(
    withInterceptors([])
  )
];
