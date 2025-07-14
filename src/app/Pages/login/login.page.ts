
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule ]
})
export class LoginPage implements OnInit {
  showPassword = false;
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {}

  onSubmit() {
    this.error = '';
    this.loading = true;
    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        // TODO: handle successful login (e.g., navigate to home, store token, etc.)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
