import { Component, computed, input } from '@angular/core';
import { StatusBadgeComponent, BadgeTone } from '../../../../shared/components/status-badge/status-badge';
import { ProductShare } from '../../data/dashboard.data';

@Component({
  selector: 'app-orders-by-product-chart',
  imports: [StatusBadgeComponent],
  templateUrl: './orders-by-product-chart.component.html',
  styleUrl: './orders-by-product-chart.component.scss',
})
export class OrdersByProductChartComponent {
  readonly items = input.required<ProductShare[]>();
  readonly total = input.required<number>();

  readonly size = 180;
  readonly stroke = 22;
  readonly r = computed(() => (this.size - this.stroke) / 2);
  readonly c = computed(() => 2 * Math.PI * this.r());

  readonly segments = computed(() => {
    const items = this.items();
    const sum = items.reduce((a, b) => a + b.percent, 0) || 100;
    const gap = Math.min(6, this.c() * 0.012); // clear separation between segments
    let offset = 0; // start at top (-90deg handled by rotation)
    return items.map((item) => {
      const frac = item.percent / sum;
      const len = Math.max(0, frac * this.c() - gap);
      const seg = { ...item, dash: `${len} ${this.c() - len}`, offset: -offset };
      offset += frac * this.c();
      return seg;
    });
  });

  badgeTone(tone: ProductShare['tone']): BadgeTone {
    switch (tone) {
      case 'teal':
        return 'primary';
      case 'mint':
        return 'success';
      case 'gold':
        return 'warning';
      default:
        return 'neutral';
    }
  }
}
