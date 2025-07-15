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
  animatedProgressList = [0, 0, 0, 0];
  targetProgressList = [0, 0, 75, 90];
  circumference = 2 * Math.PI * 36;

  filtroVolumen: 'cartones' | 'hectolitros' = 'cartones';
  kpiData: any = null;

  gradientColors = [
    ['#385CAD', '#7894D2'],
    ['#B1FDF3', '#65BAAF'],
    ['#FF8485', '#FF595A'],
    ['#FF9015', '#FFC600']
  ];

  shadowColors = ['#7894D2', '#74C2B8', '#FF595A', '#FFB347'];

  name: string = '';
  uid: string = '';
  isSidebarOpen = false;

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private kpiService: KpiService,
    private pushService: PushService
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.obtenerKpis();
    this.solicitarPermisoPushSiEsPrimeraVez();
  }

  ngAfterViewInit() {
    this.loadUserData();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout() {
    this.logoutService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('uid');
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('uid');
        this.router.navigate(['/login']);
      }
    });
  }

  solicitarPermisoPushSiEsPrimeraVez() {
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
  }

  obtenerKpis() {
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
        this.updateAnimatedProgress(0, 0);
        this.updateAnimatedProgress(1, 0);
      }
    });
  }

  onFiltroVolumenChange(filtro: 'cartones' | 'hectolitros') {
    this.filtroVolumen = filtro;
    this.actualizarVolumen();
  }

  actualizarVolumen() {
    if (!this.kpiData) {
      this.updateAnimatedProgress(0, 0);
      this.updateAnimatedProgress(1, 0);
      return;
    }

    const porcentaje = this.filtroVolumen === 'cartones'
      ? this.kpiData.cartones.porcentaje
      : this.kpiData.hectolitros.porcentaje;
    this.updateAnimatedProgress(0, Math.round(porcentaje));

    const porcentajeRet = this.filtroVolumen === 'cartones'
      ? this.kpiData.retornable.cartones.porcentaje
      : this.kpiData.retornable.hectolitros.porcentaje;
    this.updateAnimatedProgress(1, Math.round(porcentajeRet));
  }

  updateAnimatedProgress(index: number, target: number) {
    const interval = setInterval(() => {
      if (this.animatedProgressList[index] < target) {
        this.animatedProgressList[index]++;
      } else if (this.animatedProgressList[index] > target) {
        this.animatedProgressList[index]--;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  getOffset(percent: number): number {
    if (percent <= 0) return this.circumference;
    if (percent >= 100) return 0;
    return this.circumference * (1 - percent / 100);
  }

  animateHorizontalBar() {
    const target = 65;
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
      this.updateAnimatedProgress(index, target);
    });
  }

  loadUserData() {
    const name = localStorage.getItem('name');
    const uid = localStorage.getItem('uid');
    this.name = name && name.trim() ? name : 'Usuario';
    this.uid = uid && uid.trim() ? uid : '---';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
