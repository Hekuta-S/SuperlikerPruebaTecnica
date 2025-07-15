import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RegisterService } from '../../services/register-service/register.service';
import { PopupComponent } from '../../components/popup/popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PopupComponent]
})
export class RegisterPage implements OnInit {
  nombreCompleto = '';
  codigoCliente = '';
  email = '';
  genero = '';
  error = '';
  success = '';
  showPopup = false;
  loading = false;
  popupNombre = '';

  constructor(private registerService: RegisterService) { }

  ngOnInit() {}

  onSubmit() {
    this.error = '';
    this.success = '';
    this.loading = true;
    // Oculta el popup antes de registrar para forzar el refresco
    this.showPopup = false;
    setTimeout(() => {
      this.registerService.register(this.email, this.genero, this.nombreCompleto, this.codigoCliente).subscribe({
        next: (res) => {
          this.loading = false;
          if (res && res.ok === 'true') {
            this.success = '¡Registro exitoso!';
            this.popupNombre = this.nombreCompleto;
            this.showPopup = true;
            this.nombreCompleto = '';
            this.codigoCliente = '';
            this.email = '';
            this.genero = '';
          } else {
            this.error = res.message || 'Error desconocido al registrar';
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Error al registrar';
        }
      });
    }, 10);
  }
}
