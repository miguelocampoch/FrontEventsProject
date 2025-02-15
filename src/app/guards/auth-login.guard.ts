import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authLoginGuard:  CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  const access_token = localStorage.getItem('access_token');
  if (!access_token) {
    router.navigate(['/login']); // Si no hay token, redirigir a login
    return of(false);
  }

  return apiService.getEvents().pipe(
    map(() => true), // Permitir acceso si el token es válido
    catchError(() => {
      router.navigate(['/login']); // Redirigir si el token es inválido
      return of(false);
    })
  );
};