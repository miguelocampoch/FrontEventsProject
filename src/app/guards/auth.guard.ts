import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    return of(true); // Permitir el acceso a login si NO hay token
  }

  return apiService.getEvents().pipe(
    map(() => {
      router.navigate(['/dashboard']); // Si el token es válido, redirige a dashboard
      return false;
    }),
    catchError(() => {
      return of(true); // Si el token es inválido, permite el acceso a login
    })
  );
};
