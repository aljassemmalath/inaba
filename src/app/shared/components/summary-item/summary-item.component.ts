import { Component, computed, input } from '@angular/core';
import { CircleIconComponent } from '../circle-icon/circle-icon.component';

@Component({
  selector: 'app-summary-item',
  imports: [CircleIconComponent],
  template: `
    <div class="summary-item" [class]="modifierClass()">
      <div class="summary-item__icon">
        <app-circle-icon variant="outlined" size="lg" iconSize="md" [iconSrc]="iconSrc()" />
      </div>
      <div class="summary-item__body">
        <div class="summary-item__value">
          @if (isRiyal()) {
            <span class="riyal-value">
              @if (riyalParts().prefix) { <span>{{ riyalParts().prefix }}</span> }
              <img class="riyal-icon" src="/assets/images/svg/saudi-riyal-symbol-cyan%20700.svg" alt="ر.س" />
              @if (riyalParts().suffix) { <span>{{ riyalParts().suffix }}</span> }
            </span>
          } @else {
            {{ value() }}
          }
        </div>
        <div class="summary-item__label">
          {{ label() }}
          @if (hint()) { <span class="summary-item__hint">{{ hint() }}</span> }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 16px;
      background: transparent;
      border: 0;
      box-shadow: none;
    }
    .summary-item__icon { flex-shrink: 0; }
    .summary-item__body { min-width: 0; }
    .summary-item__value { font-size: 14px; font-weight: 500; color: var(--text-primary); line-height: 1.2; }
    .summary-item__label { font-size: 13px; font-weight: 400; color: var(--text-secondary); margin-top: 2px; display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px; }
    .summary-item__hint { font-size: 11px; font-weight: 400; color: var(--text-tertiary); display: inline; margin: 0; }
    .riyal-value { display: inline-flex; align-items: center; gap: 4px; }
    .riyal-icon { width: 0.85em; height: 0.85em; object-fit: contain; flex-shrink: 0; }
  `],
})
export class SummaryItemComponent {
  readonly label = input.required<string>();
  readonly hint = input('');
  readonly value = input.required<string | number>();
  readonly iconSrc = input<string | null | undefined>(null);
  readonly modifierClass = input('');

  readonly isRiyal = computed(() => typeof this.value() === 'string' && String(this.value()).includes('₪'));
  readonly riyalParts = computed(() => {
    const s = String(this.value());
    const i = s.indexOf('₪');
    if (i === -1) return { prefix: s, suffix: '' };
    return { prefix: s.slice(0, i).trimEnd(), suffix: s.slice(i + 1) };
  });
}
