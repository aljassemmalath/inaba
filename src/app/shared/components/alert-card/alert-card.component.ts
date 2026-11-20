import { Component, computed, input, output } from '@angular/core';

export type AlertCardTone = 'gold' | 'info' | 'error' | 'neutral';

@Component({
  selector: 'app-alert-card',
  template: `
    <div class="content-card-body alert-item-card" [class]="[modifierClass(), toneClass(), variant() === 'elevated' ? 'is-elevated' : '']">
      <div class="alert-main">
        <div class="alert-count-box">{{ count() }}</div>
        <div class="alert-text">
          <div class="alert-title">{{ title() }}</div>
          <div class="alert-desc">{{ description() }}</div>
        </div>
      </div>
      <button type="button" class="btn btn-brand-outline btn-sm alert-action" (click)="action.emit()">
        {{ actionLabel() }}
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .alert-item-card {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      min-height: 60px; height: 60px; padding: 8px 16px; box-sizing: border-box;
      border-radius: 4px; border: none; box-shadow: var(--shadow-xs); background: var(--background-default);
    }
    .alert-item-card.is-elevated { border: none; box-shadow: var(--shadow-xs); }
    .alert-main { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .alert-count-box {
      width: 28px; height: 28px; min-width: 28px; padding: 0; border-radius: var(--radius-sm);
      border: 0;
      display: grid; place-items: center; font-weight: 700; font-size: 12px; line-height: 1;
      background: var(--background-muted); color: var(--text-primary);
      flex-shrink: 0;
    }
    .tone-gold .alert-count-box { background: var(--gold-50); color: var(--gold-600); }
    .tone-info .alert-count-box { background: var(--info-50); color: var(--info-500); }
    .tone-error .alert-count-box { background: var(--error-50); color: var(--error-500); }
    .alert-text { min-width: 0; }
    .alert-title { font-weight: 600; color: var(--text-primary); font-size: var(--font-size-body-md); }
    .alert-desc { color: var(--text-secondary); font-size: var(--font-size-body-sm); margin-top: 1px; }
    .alert-action { flex-shrink: 0; }
  `],
})
export class AlertCardComponent {
  readonly count = input.required<string | number>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly actionLabel = input('عرض');
  readonly modifierClass = input('');
  readonly tone = input<AlertCardTone>('neutral');
  readonly variant = input<'outlined' | 'elevated'>('outlined');
  readonly action = output<void>();
  readonly toneClass = computed(() => (this.tone() && this.tone() !== 'neutral' ? `tone-${this.tone()}` : ''));
}
