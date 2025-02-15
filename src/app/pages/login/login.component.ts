import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router ) { }

  onLogin(form: any) {
    if (form.valid) {
      // Construir el objeto de credenciales.
      const credentials = {
        email: this.username, // o "username", dependiendo de lo que espere tu API.
        password: this.password
      };

      // Llamada al servicio de autenticación.
      this.authService.login(credentials).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);
          // Se asume que el token viene en response.token
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']); // Redirige si el token es inválido

          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito.
        },
        error: (error) => {
          console.error('Error en el login:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
        }
      });
    } else {
      console.warn('Formulario inválido');
    }
  }
}
