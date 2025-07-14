import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-splash',
  templateUrl: './welcome-splash.component.html',
  styleUrls: ['./welcome-splash.component.scss'],
  imports: [CommonModule],
})
export class WelcomeSplashComponent implements OnInit {
  beeTransform = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const start = this.getRandomStartPosition();
    const end = 'translate(calc(100vw - 50px), -10px)';

    // Posicionar abeja en lugar inicial
    this.beeTransform = `translate(${start.x}, ${start.y})`;

    // Forzar reflujo para que el cambio de transform se anime correctamente
    setTimeout(() => {
      this.beeTransform = end;
    }, 50); // delay mínimo para permitir la animación

    // Redirigir después de 5 segundos
    setTimeout(() => {
      this.router.navigate(['/home']); // Cambia '/home' por tu ruta destino
    }, 4500);
  }

  getRandomStartPosition() {
    const positions = [
      { x: '-50px', y: '50%' }, // izquierda centro
      { x: '50%', y: 'calc(100vh - 50px)' }, // abajo centro
      { x: 'calc(100vw - 50px)', y: 'calc(100vh - 50px)' }, // abajo derecha
      { x: '0', y: '0' }, // esquina superior izquierda
    ];
    const safePositions = positions.filter(
      p => !(p.x === 'calc(100vw - 50px)' && p.y === '-10px') // evitar zona superior derecha
    );
    return safePositions[Math.floor(Math.random() * safePositions.length)];
  }
}
