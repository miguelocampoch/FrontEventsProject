import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // Agrega esta línea
import { authGuard} from './guards/auth.guard'; // Agrega esta línea
import { authLoginGuard} from './guards/auth-login.guard'; // Agrega esta línea

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent,canActivate: [authLoginGuard] },
    { path: 'login', component: LoginComponent,canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }

];
