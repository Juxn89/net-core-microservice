import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { SecurityService } from '../security/security.service';

export const securityInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(SecurityService).getToken()
  
  if (!authToken || req.url.includes('/login')) {
    return next(req);
  }

  const request = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  })

  return next(request);
};
