import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-push-permission-modal',
  template: `
    <ion-modal [isOpen]="isOpen" cssClass="push-modal-custom">
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-[#1c355e] rounded-2xl shadow-2xl p-8 w-full max-w-xs mx-auto text-center border-4 border-[#385CAD]">
          <h2 class="text-lg font-bold mb-2 text-[#FFC600]">Permitir notificaciones</h2>
          <p class="mb-4 text-white">¿Deseas recibir notificaciones push para estar al tanto de novedades y alertas importantes?</p>
          <div class="flex justify-center gap-4 mt-6">
            <ion-button color="primary" (click)="onAccept()">Permitir</ion-button>
            <ion-button color="medium" (click)="onDecline()">No, gracias</ion-button>
          </div>
        </div>
      </div>
    </ion-modal>
  `,
  standalone: true,
  imports: [CommonModule, IonModal, IonButton]
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
