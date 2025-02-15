import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../services/auth/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  events: any[] = [];

  constructor(private router: Router, private apiService: ApiService,private authService: AuthService){
    this.apiService.getEvents().subscribe({
      next: (data) => {
        console.log('Eventos recibidos:', data);
        this.events = data;
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']); // Redirige si el token es inválido
        }
      }
    });

  }
  ngOnInit(): void {

  }
  logout() {

    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        this.router.navigate(['/login']);
      },
      error: () => {} // En caso de error, igual limpiamos la sesión
    });

  }
}
