import { Component, input } from '@angular/core';
import { IconPlaceholderComponent, IconPlaceholderSize } from '../icon-placeholder/icon-placeholder.component';

@Component({
  selector: 'app-stat-card',
  imports: [IconPlaceholderComponent],
  template: `
    <div class="content-card-body stats-card" [class]="modifierClass()">
      <div class="stat-main">
        <div class="stat-title">{{ title() }}</div>
        <div class="stat-value">{{ value() }}</div>
      </div>
      <div class="stat-icon-wrap" aria-hidden="true">
        <app-icon-placeholder [size]="iconSize()" />
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .stat-main { text-align: right; }
    .stat-title { font-size: var(--font-size-body-sm); color: var(--text-secondary); margin-bottom: 4px; }
    .stat-value { font-size: 24px; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
    .stat-icon-wrap {
      width: 44px; height: 44px; border-radius: 50%;
      display: grid; place-items: center; flex-shrink: 0;
      background: var(--background-muted);
    }
  `],
})
export class StatCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  /** Reserved for future icon asset key. */
  readonly icon = input<string | undefined>(undefined);
  readonly iconSize = input<IconPlaceholderSize>('lg');
  readonly modifierClass = input('');
}
