import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  tabs = ['Resumen', 'Autoejecución', 'Radiografía'];
  selectedTab = 0;
horizontalProgress = 0;
  targetProgressList = [25, 50, 75, 90];
  animatedProgressList = [0, 0, 0, 0];
  circumference = 2 * Math.PI * 30;

  // 🎨 Degradado lineal de cada barra
  gradientColors = [
    ['#385CAD', '#7894D2'],   // 1
    ['#B1FDF3', '#65BAAF'],   // 2
    ['#FF8485', '#FF595A'],   // 3
    ['#FF9015', '#FFC600']    // 4
  ];

  // 💡 Colores para sombra paralela
  shadowColors = ['#7894D2', '#74C2B8', '#FF595A', '#FFB347'];

  constructor(private router: Router) {}

  
  ngOnInit() {
    this.startAnimations();
      this.animateHorizontalBar();

  }

animateHorizontalBar() {
  const target = 65; // Cambia esto al % deseado
  const interval = setInterval(() => {
    if (this.horizontalProgress < target) {
      this.horizontalProgress++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}


  startAnimations() {
    this.targetProgressList.forEach((target, index) => {
      const interval = setInterval(() => {
        if (this.animatedProgressList[index] < target) {
          this.animatedProgressList[index]++;
        } else {
          clearInterval(interval);
        }
      }, 20);
    });
  }

  getOffset(percent: number): number {
    return this.circumference * (1 - percent / 100);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}