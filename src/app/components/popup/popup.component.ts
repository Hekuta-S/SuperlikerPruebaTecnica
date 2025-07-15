import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PopupComponent {
  @Input() showPopup = false;
  @Input() nombre = '';

  cerrarPopup() {
    this.showPopup = false;
  }
}
