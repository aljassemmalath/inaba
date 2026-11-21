import { Component, input } from '@angular/core';

export type InlineAlertVariant = 'info' | 'text';

@Component({
  selector: 'app-inline-alert',
  standalone: true,
  template: `
    <div
      class="inline-alert"
      [class.inline-alert--info]="variant() === 'info'"
      [class.inline-alert--text]="variant() === 'text'"
      role="status"
    >
      <span class="inline-alert__desc"><ng-content /></span>
      <ng-content select="[inline-alert-action]" />
    </div>
  `,
  styles: [`
    .inline-alert {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      margin-top: 16px; padding: 12px 16px;
      border: 1px solid var(--border-info); border-radius: var(--radius-md);
      background: var(--info-20); color: var(--text-info);
    }
    .inline-alert__desc { font-size: var(--font-size-body-sm); line-height: var(--line-height-body-sm); }
    .inline-alert--text {
      justify-content: flex-start; margin-top: 12px; padding: 0;
      border: 0; background: transparent; color: var(--text-tertiary);
    }
    :host ::ng-deep [inline-alert-action] { flex-shrink: 0; }
  `],
})
export class InlineAlertComponent {
  readonly variant = input<InlineAlertVariant>('info');
}
