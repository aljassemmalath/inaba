import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-container',
  template: `
    <div class="content-card-body summary-container" [class]="modifierClass()">
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .summary-container {
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;
      gap: 0;
    }
    .summary-container ::ng-deep app-summary-item {
      flex: 1 1 160px;
      min-width: 140px;
      position: relative;
    }
    .summary-container ::ng-deep app-summary-item:not(:last-child)::after {
      content: "";
      position: absolute;
      inset-inline-end: 0;
      top: 8px;
      bottom: 8px;
      width: 1px;
      background: var(--border-default);
    }
    .summary-container.summary-container--bordered { gap: 12px; }
    .summary-container.summary-container--bordered ::ng-deep app-summary-item {
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      background: var(--background-default);
      box-shadow: var(--shadow-xs);
      box-sizing: border-box;
      min-height: 72px;
    }
    .summary-container.summary-container--bordered ::ng-deep app-summary-item::after { display: none; }
    @media (max-width: 767.98px) {
      .summary-container ::ng-deep app-summary-item::after { display: none; }
      .summary-container { gap: 8px 0; }
    }
  `],
})
export class SummaryContainerComponent {
  readonly modifierClass = input('');
}
