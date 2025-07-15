import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'app-push-permission-modal',
  template: `
    <ion-alert
      [isOpen]="isOpen"
      header="Permitir notificaciones"
      message="¿Deseas recibir notificaciones push para estar al tanto de novedades y alertas importantes?"
      [buttons]="alertButtons">
    </ion-alert>
  `,
  standalone: true,
  imports: [CommonModule, IonAlert]
})
export class PushPermissionModalComponent {
  isOpen = false;
  onAcceptCallback: (() => void) | null = null;
  onDeclineCallback: (() => void) | null = null;
  alertButtons: any[] = [];

  open(onAccept: () => void, onDecline: () => void) {
    this.alertButtons = [
      {
        text: 'No, gracias',
        role: 'cancel',
        handler: () => {
          this.isOpen = false;
          if (onDecline) onDecline();
        }
      },
      {
        text: 'Permitir',
        handler: () => {
          this.isOpen = false;
          if (onAccept) onAccept();
        },
        cssClass: 'primary'
      }
    ];
    this.isOpen = true;
    this.onAcceptCallback = onAccept;
    this.onDeclineCallback = onDecline;
  }
}
