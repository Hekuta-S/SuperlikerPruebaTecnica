import { Routes } from '@angular/router';
import { WelcomeSplashComponent } from './components/welcome-splash/welcome-splash.component';

export const routes: Routes = [
  {
    path: '', component: WelcomeSplashComponent 
  },
  {
    path: 'login',
    loadComponent: () => import('./Pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./Pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'register',
    loadComponent: () => import('./Pages/register/register.page').then( m => m.RegisterPage)
  },
  
];
