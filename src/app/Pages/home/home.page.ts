import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout-service/logout.service';
import { KpiService } from '../../services/kpi-service/kpi.service';
import { PushService } from '../../services/push-service/push.service';
import { PushPermissionModalComponent } from '../../components/push-permission-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PushPermissionModalComponent]
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild(PushPermissionModalComponent) pushModal?: PushPermissionModalComponent;

  tabs = ['Resumen', 'Autoejecución', 'Radiografía'];
  selectedTab = 0;
  horizontalProgress = 0;
  targetProgressList = [0, 0, 75, 90];
  animatedProgressList = [0, 0, 0, 0];
  circumference = 2 * Math.PI * 30;

  filtroVolumen: 'cartones' | 'hectolitros' = 'cartones';
  kpiData: any = null;

  // 🎨 Degradado lineal de cada barra
  gradientColors = [
    ['#385CAD', '#7894D2'],   // 1
    ['#B1FDF3', '#65BAAF'],   // 2
    ['#FF8485', '#FF595A'],   // 3
    ['#FF9015', '#FFC600']    // 4
  ];

  // 💡 Colores para sombra paralela
  shadowColors = ['#7894D2', '#74C2B8', '#FF595A', '#FFB347'];

  name: string = '';
  uid: string = '';
isSidebarOpen = false;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private kpiService: KpiService,
    private pushService: PushService
  ) {}

  onLogout() {
    this.logoutService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('uid');
        this.router.navigate(['/login']);
      },
      error: () => {
        // Si falla el logout, igual limpiamos y redirigimos
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('uid');
        this.router.navigate(['/login']);
      }
    });
  }

  

  ngOnInit() {
    this.loadUserData();
    this.obtenerKpis();
    this.startAnimations();
    this.solicitarPermisoPushSiEsPrimeraVez();
  }

  solicitarPermisoPushSiEsPrimeraVez() {
    // Solo mostrar si no se ha solicitado antes
    if (!localStorage.getItem('pushPermissionAsked')) {
      setTimeout(() => {
        this.pushModal?.open(
          () => this.solicitarPermisoPush(),
          () => localStorage.setItem('pushPermissionAsked', '1')
        );
      }, 500);
    }
  }

  async solicitarPermisoPush() {
    localStorage.setItem('pushPermissionAsked', '1');
    const status = await this.pushService.requestPushPermission();
    // Puedes manejar la respuesta aquí si quieres mostrar feedback
    // Ejemplo: if (status.receive === 'granted') { ... }
  }
  obtenerKpis() {
    // Usa el token guardado como api_key
    // Usa el api_key de la campaña, no el token de sesión
    const body = {
      api_key: '32e608447ff50d5b6760c335ffe87262',
      campaign: '4u',
      date_filter: {
        sdate: '2024-08-01',
        edate: '2024-08-31'
      },
      _type: 'External',
      atype: 'avance_metas'
    };
    this.kpiService.obtenerKPIs(body).subscribe({
      next: (data) => {
        this.kpiData = data;
        this.actualizarVolumen();
      },
      error: () => {
        this.kpiData = null;
        this.animatedProgressList[0] = 0;
      }
    });
  }

  onFiltroVolumenChange(filtro: 'cartones' | 'hectolitros') {
    this.filtroVolumen = filtro;
    this.actualizarVolumen();
  }

  actualizarVolumen() {
    if (!this.kpiData) {
      this.animatedProgressList[0] = 0;
      this.animatedProgressList[1] = 0;
      return;
    }
    // Volumen total
    const porcentaje = this.filtroVolumen === 'cartones'
      ? this.kpiData.cartones.porcentaje
      : this.kpiData.hectolitros.porcentaje;
    this.animatedProgressList[0] = Math.round(porcentaje);

    // Volumen retornable
    const porcentajeRet = this.filtroVolumen === 'cartones'
      ? this.kpiData.retornable.cartones.porcentaje
      : this.kpiData.retornable.hectolitros.porcentaje;
    this.animatedProgressList[1] = Math.round(porcentajeRet);
  }

  ngAfterViewInit() {
    this.loadUserData();
  }

  loadUserData() {
    const name = localStorage.getItem('name');
    const uid = localStorage.getItem('uid');
    this.name = name && name.trim() ? name : 'Usuario';
    this.uid = uid && uid.trim() ? uid : '---';
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