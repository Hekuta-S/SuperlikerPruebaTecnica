import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-push-permission-modal',
  template: `
    <ion-modal [isOpen]="isOpen">
      <ion-content>
        <ion-header>
          <ion-toolbar>
            <ion-title>Permitir notificaciones</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>¿Deseas recibir notificaciones push para estar al tanto de novedades y alertas importantes?</p>
          <div class="ion-text-center ion-margin-top">
            <ion-button expand="block" color="primary" (click)="onAccept()">Permitir</ion-button>
            <ion-button expand="block" color="medium" (click)="onDecline()">No, gracias</ion-button>
          </div>
        </ion-content>
      </ion-content>
    </ion-modal>
  `,
  standalone: true,
  imports: [CommonModule, IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle]
})
export class PushPermissionModalComponent {
  isOpen = false;
  onAcceptCallback: (() => void) | null = null;
  onDeclineCallback: (() => void) | null = null;

  open(onAccept: () => void, onDecline: () => void) {
    this.isOpen = true;
    this.onAcceptCallback = onAccept;
    this.onDeclineCallback = onDecline;
  }
  close() {
    this.isOpen = false;
  }
  onAccept() {
    this.close();
    if (this.onAcceptCallback) this.onAcceptCallback();
  }
  onDecline() {
    this.close();
    if (this.onDeclineCallback) this.onDeclineCallback();
  }
}
