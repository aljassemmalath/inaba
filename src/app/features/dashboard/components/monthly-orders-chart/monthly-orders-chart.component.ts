import { Component, computed, input } from '@angular/core';
import { MonthlyOrdersGroup } from '../../data/dashboard.data';

@Component({
  selector: 'app-monthly-orders-chart',
  templateUrl: './monthly-orders-chart.component.html',
  styleUrl: './monthly-orders-chart.component.scss',
})
export class MonthlyOrdersChartComponent {
  readonly data = input.required<MonthlyOrdersGroup[]>();

  readonly viewW = 980;
  readonly viewH = 320;
  readonly padL = 44; // space for Y-axis labels
  readonly padR = 20;
  readonly padT = 20;
  readonly padB = 56;
  readonly yMax = 50;

  readonly gridLines = computed(() => {
    const innerH = this.viewH - this.padT - this.padB;
    const base = this.viewH - this.padB;
    const labels = ['0', '', '20', '', '30', '', '40', '', '50'];
    const count = 9;
    return Array.from({ length: count }, (_, i) => {
      const y = base - (innerH * i) / (count - 1);
      return { y, label: labels[i] ?? '' };
    });
  });

  readonly bars = computed(() => {
    const data = this.data();
    const n = data.length || 1;
    const innerW = this.viewW - this.padL - this.padR;
    const innerH = this.viewH - this.padT - this.padB;
    const groupW = innerW / n;
    const barW = Math.min(14, groupW * 0.22);
    const gap = 4;
    const max = this.yMax;
    const base = this.viewH - this.padB;
    return data.map((d, i) => {
      const cx = this.padL + groupW * i + groupW / 2;
      const vA = Math.min(d.seriesA, max);
      const vB = Math.min(d.seriesB, max);
      const hA = (vA / max) * innerH;
      const hB = (vB / max) * innerH;
      return {
        month: d.month,
        seriesA: d.seriesA,
        seriesB: d.seriesB,
        xA: cx + gap / 2,
        xB: cx - gap / 2 - barW,
        yA: base - hA,
        yB: base - hB,
        hA,
        hB,
        w: barW,
        labelX: cx,
        labelY: base + 22,
      };
    });
  });
}
