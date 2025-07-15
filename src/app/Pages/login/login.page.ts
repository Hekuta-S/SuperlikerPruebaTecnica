
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
        if (res && res.ok === 'true' && res.token && res.participant) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.participant.name);
          localStorage.setItem('uid', res.participant.uid);
          this.router.navigate(['/home']);
        } else {
          this.error = res.message || 'Error desconocido en el login';
        }
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
