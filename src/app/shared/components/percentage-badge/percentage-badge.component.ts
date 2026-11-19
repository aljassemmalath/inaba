import { Component, input } from '@angular/core';

@Component({
  selector: 'app-percentage-badge',
  template: `
    <div class="percentage-row">
      <span class="pct-badge" [class]="[modifierClass(), tone() ? 'pct-badge--' + tone() : '']">{{ percent() }}%</span>
      <span class="pct-label">{{ label() }}</span>
    </div>
  `,
  styles: [`
    .percentage-row { display: flex; align-items: center; gap: 10px; }
    .pct-badge {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 52px; padding: 4px 10px; border-radius: 4px;
      background: var(--background-muted); color: var(--text-primary);
      font-size: var(--font-size-body-sm); font-weight: 600;
    }
    .pct-badge--teal { background: var(--teal-20); color: var(--teal-700); }
    .pct-badge--mint { background: var(--mint-20); color: var(--success-text); }
    .pct-badge--gold { background: var(--gold-20); color: var(--gold-700); }
    .pct-label { font-size: var(--font-size-body-md); color: var(--text-secondary); }
  `],
})
export class PercentageBadgeComponent {
  readonly percent = input.required<number | string>();
  readonly label = input.required<string>();
  readonly modifierClass = input('');
  readonly tone = input<'teal' | 'mint' | 'gold' | ''>('');
}
