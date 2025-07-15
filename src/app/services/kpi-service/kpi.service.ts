// kpi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface KpiData {
  hectolitros: { meta: number; avance: number; porcentaje: number };
  cartones: { meta: number; avance: number; porcentaje: number };
  retornable: {
    hectolitros: { meta: number; avance: number; porcentaje: number };
    cartones: { meta: number; avance: number; porcentaje: number };
  };
}

@Injectable({ providedIn: 'root' })
export class KpiService {
  private apiUrl = '/v1/entries/index';

  constructor(private http: HttpClient) {}

  obtenerKPIs(body: any): Observable<KpiData> {
    return this.http.post<any>(this.apiUrl, body).pipe(
      map(res => {
        const entries = res?.data?.entries || [];
        const ultimo = entries[entries.length - 1];
        const data = ultimo?.data || {};

        const metaH = parseFloat(data.volumen_meta_mes_hectolitros || '0');
        const avanceH = parseFloat(data.volumen_avance_actual_hectolitros || '0');
        const metaC = parseFloat(data.volumen_meta_mes_cartones || '0');
        const avanceC = parseFloat(data.volumen_avance_actual_cartones || '0');

        // Retornable
        const metaRH = parseFloat(data.volumen_retornable_meta_mes_hectolitros || '0');
        const avanceRH = parseFloat(data.volumen_retornable_avance_actual_hectolitros || '0');
        const metaRC = parseFloat(data.volumen_retornable_meta_mes_cartones || '0');
        const avanceRC = parseFloat(data.volumen_retornable_avance_actual_cartones || '0');

        const porcentaje = (a: number, m: number) => m > 0 ? (a / m) * 100 : 0;

        return {
          hectolitros: {
            meta: metaH,
            avance: avanceH,
            porcentaje: parseFloat(porcentaje(avanceH, metaH).toFixed(2))
          },
          cartones: {
            meta: metaC,
            avance: avanceC,
            porcentaje: parseFloat(porcentaje(avanceC, metaC).toFixed(2))
          },
          retornable: {
            hectolitros: {
              meta: metaRH,
              avance: avanceRH,
              porcentaje: parseFloat(porcentaje(avanceRH, metaRH).toFixed(2))
            },
            cartones: {
              meta: metaRC,
              avance: avanceRC,
              porcentaje: parseFloat(porcentaje(avanceRC, metaRC).toFixed(2))
            }
          }
        };
      })
    );
  }
}
