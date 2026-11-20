import { Component, input } from '@angular/core';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';

@Component({
  selector: 'app-financial-summary-card',
  imports: [IconPlaceholderComponent],
  template: `
    <div class="content-card-body financial-item-card" [class]="modifierClass()" [class.is-net-profit]="isNetProfit()">
      <div class="fin-right">
        <div class="fin-icon" aria-hidden="true"><app-icon-placeholder size="lg" [src]="iconSrc() || icon()" /></div>
        <div class="fin-label">{{ label() }}</div>
      </div>
      <div class="fin-value">
        @if (isNetProfit()) {
          <img class="riyal" src="assets/images/svg/saudi-riyal-symbol-cyan%20500.svg" alt="" aria-hidden="true" />
        }
        <span>{{ value() }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .financial-item-card {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 16px;
      box-shadow: none;
      border: 1px solid var(--border-subtle);
    }
    .fin-right { display: flex; align-items: center; gap: 10px; }
    .fin-icon {
      width: 42px; height: 42px; border-radius: 6px; display: grid; place-items: center;
      background: transparent; border: 1px solid var(--border-default); color: var(--action-primary-default);
      box-sizing: border-box;
    }
    .fin-label { font-size: var(--font-size-body-md); color: var(--text-secondary); }
    .fin-value { font-size: 20px; font-weight: 700; color: var(--text-primary); display: inline-flex; align-items: center; gap: 4px; }
    .financial-item-card.is-net-profit { background: var(--teal-50); }
    .financial-item-card.is-net-profit .fin-icon { background: var(--teal-50); border-color: var(--teal-100); }
    .financial-item-card.is-net-profit .fin-value { color: var(--teal-500); }
    .riyal { width: 16px; height: 16px; display: inline-block; object-fit: contain; flex-shrink: 0; }
  `],
})
export class FinancialSummaryCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  /** Reserved for future icon asset key. */
  readonly icon = input<string | undefined>(undefined);
  readonly iconSrc = input<string | null | undefined>(undefined);
  readonly modifierClass = input('');
  readonly isNetProfit = input(false);
}
